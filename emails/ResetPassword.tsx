import * as React from 'react'

interface ResetPasswordEmailProps {
  resetUrl: string
  userEmail: string
}

export default function ResetPasswordEmail({ resetUrl, userEmail }: ResetPasswordEmailProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sécurité de votre compte Trott e Perf</title>
      </head>
      <body style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, system-ui, sans-serif',
        lineHeight: '1.5',
        color: '#ffffff',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '0',
        backgroundColor: '#000000',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale'
      }}>

        {/* Email Container */}
        <div style={{
          backgroundColor: '#000000',
          minHeight: '100vh',
          padding: '40px 20px'
        }}>

          {/* Logo/Brand Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '48px'
          }}>
            {/* Logo Trott e Perf */}
            <div style={{
              marginBottom: '20px'
            }}>
              <img
                src="https://trott-e-perf.com/logo.png"
                alt="Trott e Perf"
                style={{
                  height: '40px',
                  width: 'auto',
                  filter: 'brightness(0) invert(1)' // Pour rendre le logo blanc sur fond noir
                }}
              />
            </div>

                          <h1 style={{
                margin: '0 0 8px 0',
                fontSize: '20px',
                fontWeight: '600',
                color: '#ffffff',
                letterSpacing: '-0.01em'
              }}>
                Sécurité de votre compte
              </h1>

            <p style={{
              margin: '0',
              fontSize: '15px',
              color: '#71717a',
              fontWeight: '500',
              letterSpacing: '0.01em'
            }}>
              Trott e Perf • Système de sécurité
            </p>
          </div>

          {/* Main Content Card */}
          <div style={{
            backgroundColor: '#111111',
            borderRadius: '20px',
            padding: '40px',
            border: '1px solid #222222',
            marginBottom: '24px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>

            <h2 style={{
              margin: '0 0 24px 0',
              fontSize: '24px',
              fontWeight: '600',
              color: '#ffffff',
              letterSpacing: '-0.01em',
              lineHeight: '1.3'
            }}>
              Réinitialisation de mot de passe
            </h2>

            <p style={{
              fontSize: '17px',
              color: '#e4e4e7',
              margin: '0 0 20px 0',
              lineHeight: '1.6'
            }}>
              Bonjour,
            </p>

            <p style={{
              fontSize: '16px',
              color: '#a1a1aa',
              margin: '0 0 20px 0',
              lineHeight: '1.6'
            }}>
              Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte
              <strong style={{ color: '#ffffff' }}> Trott e Perf</strong>. Cette demande concerne le compte associé à l'adresse email suivante :
            </p>

            {/* Email Display */}
            <div style={{
              backgroundColor: '#1a1a1a',
              border: '1px solid #333333',
              borderRadius: '12px',
              padding: '16px 20px',
              marginBottom: '28px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#22c55e',
                  borderRadius: '50%'
                }}>
                </div>
                <p style={{
                  margin: '0',
                  fontSize: '15px',
                  color: '#ffffff',
                  fontWeight: '600',
                  fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace'
                }}>
                  <strong style={{ color: '#ffffff' }}> {userEmail} </strong>
                </p>
              </div>
            </div>

            <p style={{
              fontSize: '16px',
              color: '#a1a1aa',
              margin: '0 0 20px 0',
              lineHeight: '1.6'
            }}>
              Pour des raisons de sécurité, cette demande nécessite une validation de votre part.
              Si vous êtes à l'origine de cette demande, cliquez sur le bouton ci-dessous pour procéder
              à la création de votre nouveau mot de passe sécurisé.
            </p>

            <p style={{
              fontSize: '15px',
              color: '#71717a',
              margin: '0 0 32px 0',
              lineHeight: '1.5'
            }}>
              Cette action vous permettra de retrouver l'accès complet à votre espace client
              et à tous les services <strong style={{ color: '#a1a1aa' }}>Trott e Perf</strong>.
            </p>

            {/* CTA Button */}
            <div style={{
              textAlign: 'center',
              margin: '40px 0'
            }}>
              <a href={resetUrl} style={{
                backgroundColor: '#ffffff',
                color: '#000000',
                padding: '16px 32px',
                textDecoration: 'none',
                borderRadius: '14px',
                fontWeight: '600',
                fontSize: '16px',
                display: 'inline-block',
                letterSpacing: '-0.01em',
                transition: 'all 0.2s ease',
                border: 'none',
                boxShadow: '0 4px 16px rgba(255, 255, 255, 0.1)'
              }}>
                Réinitialiser mon mot de passe
              </a>
            </div>

            <div style={{
              textAlign: 'center',
              margin: '20px 0 0 0'
            }}>
              <p style={{
                fontSize: '13px',
                color: '#52525b',
                margin: '0'
              }}>
                Action sécurisée • Processus vérifié par Trott e Perf
              </p>
            </div>
          </div>

          {/* Security Notice - Style Sobre */}
          <div style={{
            backgroundColor: '#111111',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '24px',
            border: '1px solid #333333'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#a1a1aa',
                flexShrink: 0
              }}>
              </div>
              <p style={{
                fontSize: '13px',
                color: '#a1a1aa',
                margin: '0',
                lineHeight: '1.4'
              }}>
                Ce lien expire dans <strong style={{ color: '#ffffff' }}>1 heure</strong> pour protéger votre compte.
              </p>
            </div>
          </div>

          {/* Alternative Link Section */}
          <div style={{
            backgroundColor: '#0a0a0a',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #1a1a1a',
            marginBottom: '32px'
          }}>
            <h4 style={{
              fontSize: '14px',
              color: '#e4e4e7',
              margin: '0 0 12px 0',
              fontWeight: '600'
            }}>
              Lien alternatif
            </h4>
            <p style={{
              fontSize: '13px',
              color: '#71717a',
              margin: '0 0 16px 0',
              lineHeight: '1.4'
            }}>
              Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur :
            </p>

            <div style={{
              backgroundColor: '#111111',
              border: '1px solid #333333',
              borderRadius: '8px',
              padding: '12px 16px',
              wordBreak: 'break-all'
            }}>
              <a href={resetUrl} style={{
                fontSize: '12px',
                color: '#a1a1aa',
                textDecoration: 'none',
                fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
                lineHeight: '1.4'
              }}>
                {resetUrl}
              </a>
            </div>
          </div>

          {/* Footer */}
          <div style={{
            textAlign: 'center',
            paddingTop: '32px',
            borderTop: '1px solid #1a1a1a'
          }}>
            <p style={{
              fontSize: '13px',
              color: '#52525b',
              margin: '0 0 20px 0',
              lineHeight: '1.5'
            }}>
              Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.<br />
              Votre mot de passe actuel reste inchangé et votre compte demeure sécurisé.
            </p>

            <p style={{
              fontSize: '12px',
              color: '#3f3f46',
              margin: '0 0 16px 0',
              lineHeight: '1.4'
            }}>
              En cas de questions concernant la sécurité de votre compte,
              contactez notre équipe support à{' '}
              <a href="mailto:support@trott-e-perf.com" style={{
                color: '#a1a1aa',
                textDecoration: 'none'
              }}>
                support@trott-e-perf.com
              </a>
            </p>

            <div style={{
              marginTop: '24px',
              paddingTop: '24px',
              borderTop: '1px solid #0f0f0f'
            }}>
              <p style={{
                fontSize: '11px',
                color: '#3f3f46',
                margin: '0 0 8px 0',
                fontWeight: '600',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                Trott e Perf
              </p>
              <p style={{
                fontSize: '10px',
                color: '#27272a',
                margin: '0',
                letterSpacing: '0.025em'
              }}>
                Système de sécurité automatique • Spécialiste trottinettes électriques
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}

// Version texte alternative - plus professionnelle
export function ResetPasswordEmailText({ resetUrl, userEmail }: ResetPasswordEmailProps) {
  return `
╔══════════════════════════════════════════════════════════════════════════════╗
║                               TROTT E PERF                                   ║
║                        Sécurité de votre compte                             ║
╚══════════════════════════════════════════════════════════════════════════════╝

Bonjour,

Nous avons reçu une demande de réinitialisation de mot de passe pour votre
compte Trott e Perf associé à l'adresse email suivante :

→ ${userEmail}

Pour des raisons de sécurité, cette demande nécessite une validation de votre
part. Si vous êtes à l'origine de cette demande, utilisez le lien ci-dessous
pour procéder à la création de votre nouveau mot de passe sécurisé :

${resetUrl}

🔒 INFORMATIONS IMPORTANTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Ce lien expire automatiquement dans 1 HEURE pour protéger votre compte
• Utilisez-le dès que possible pour maintenir la sécurité
• Cette action vous permettra de retrouver l'accès à votre espace client

Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.
Votre mot de passe actuel reste inchangé et votre compte demeure sécurisé.

Pour toute question : support@trott-e-perf.com

────────────────────────────────────────────────────────────────────────────────
TROTT E PERF • Système de sécurité automatique
Spécialiste trottinettes électriques
  `.trim()
}
