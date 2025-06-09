import { Resend } from 'resend'

// ⚠️ Mets ici ta clé temporairement pour tester
const resend = new Resend('re_KavyjKxh_PacbuATwJhV3odrWKNyrXUes')

async function testSend() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Test <noreply@trott-e-perf.com>',
      to: 'hugoguttr@gmail.com',
      subject: 'Test Resend API',
      html: `<h1>✅ Ça marche !</h1><p>Ton API Resend est bien configurée.</p>`,
    })

    if (error) {
      console.error('❌ Erreur Resend :', error)
    } else {
      console.log('✅ Email envoyé avec succès :', data)
    }
  } catch (err) {
    console.error('❌ Erreur JS :', err)
  }
}

testSend()
