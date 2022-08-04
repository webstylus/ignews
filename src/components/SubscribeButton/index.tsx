import styles from './styles.module.scss'
import { signIn, useSession } from 'next-auth/react'
import { api } from '../../services/api'
import { getStripeJs } from '../../services/stripe-js'
import { useRouter } from 'next/router'

interface ISubscribeButtonProps {
  priceId: string
}

export default function SubscribeButton({ priceId }: ISubscribeButtonProps) {
  const { data: session } = useSession()
  const router = useRouter()

  async function handleSubscribe() {
    if (!session) {
      await signIn('github')
      return
    }

    if (session?.activeSubscription) {
      await router.push('/posts')
      return
    }
    //checkout
    try {
      const { data } = await api.post('/subscribe')
      const { sessionId } = data
      const stripe = await getStripeJs()
      await stripe.redirectToCheckout({ sessionId })
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
