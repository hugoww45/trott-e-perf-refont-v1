"use client";

import { useState } from 'react';
import { requestPasswordReset, resetPassword, extractResetParams } from '@/lib/shopify/password-reset';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface PasswordResetProps {
  customerId?: string;
  resetToken?: string;
}

export function PasswordReset({ customerId, resetToken }: PasswordResetProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetLink, setResetLink] = useState('');
  const [showResetLinkInput, setShowResetLinkInput] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log('Demande de réinitialisation pour:', email);
      const result = await requestPasswordReset(email);

      if (result.success) {
        toast.success('Un email de réinitialisation a été envoyé à votre adresse email');
        setShowResetLinkInput(true);
      } else {
        const errorMsg = result.error || 'Une erreur est survenue';
        console.error('Erreur de réinitialisation:', errorMsg);
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Une erreur est survenue lors de la demande de réinitialisation';
      console.error('Exception lors de la demande de réinitialisation:', error);
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleResetLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      console.log('Traitement du lien de réinitialisation:', resetLink);
      const params = extractResetParams(resetLink);

      if (params) {
        console.log('Paramètres extraits:', params);
        // Rediriger vers la page de réinitialisation avec les paramètres
        router.push(`/reset-password?id=${encodeURIComponent(params.customerId)}&token=${encodeURIComponent(params.resetToken)}`);
      } else {
        const errorMsg = 'Lien de réinitialisation invalide. Veuillez vérifier le lien reçu par email.';
        console.error(errorMsg);
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Le lien de réinitialisation est invalide ou mal formaté.';
      console.error('Erreur lors du traitement du lien:', error);
      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!customerId || !resetToken) {
      const errorMsg = 'Informations de réinitialisation manquantes';
      console.error(errorMsg);
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    if (password !== confirmPassword) {
      const errorMsg = 'Les mots de passe ne correspondent pas';
      console.error(errorMsg);
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    setLoading(true);

    try {
      console.log('Réinitialisation du mot de passe pour le client:', customerId);
      const result = await resetPassword(customerId, {
        password,
        resetToken,
      });

      if (result.success) {
        toast.success('Votre mot de passe a été réinitialisé avec succès');
        // Rediriger vers la page de connexion
        router.push('/login');
      } else {
        const errorMsg = result.error || 'Une erreur est survenue';
        console.error('Erreur de réinitialisation:', errorMsg);
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Une erreur est survenue lors de la réinitialisation du mot de passe';
      console.error('Exception lors de la réinitialisation:', error);
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (customerId && resetToken) {
    return (
      <form onSubmit={handleResetPassword} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        <div>
          <Input
            type="password"
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Réinitialisation en cours...' : 'Réinitialiser le mot de passe'}
        </Button>
      </form>
    );
  }

  if (showResetLinkInput) {
    return (
      <form onSubmit={handleResetLinkSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        <div>
          <p className="mb-2 text-sm text-gray-600">
            Collez le lien de réinitialisation reçu par email :
          </p>
          <Input
            type="text"
            placeholder="Lien de réinitialisation"
            value={resetLink}
            onChange={(e) => setResetLink(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Continuer
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleRequestReset} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      <div>
        <Input
          type="email"
          placeholder="Votre adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Envoi en cours...' : 'Demander la réinitialisation'}
      </Button>
    </form>
  );
}
