import styles from './styles.module.scss'
import { signIn, useSession } from 'next-auth/react'
import { api } from '../../services/api'
import { getStripeJs } from '../../services/stripe-js'

interface ISubscribeButtonProps {
  priceId: string
}

export default function SubscribeButton({ priceId }: ISubscribeButtonProps) {
  const { data: session } = useSession()

  async function handleSubscribe() {
    if (!session) {
      await signIn('github')
      return
    }
    //checkout
    try {
      const { data } = await api.post('/subscribe')
      const { sessionId } = data
      const stripe = await getStripeJs()
      await stripe.redirectToCheckout({sessionId})
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <button
      type={'button'}
      className={styles.subScribeButton}
      onClick={handleSubscribe}
    >
      Subscribe Now
    </button>
  )
}
