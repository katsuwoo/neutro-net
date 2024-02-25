import { getProviders } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/nextauth-options"
import { redirect } from "next/navigation"
import FederatedSignInButton from "@/components/FederatedSignInButton"
import Image from 'next/image'
import Link from "next/link"

export default async function SignIn() {
  const session = await getServerSession(authOptions)
  const providers = await getProviders()

  if (session) {
    redirect("/")
  }

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <div className='border-main-blue border-2 rounded-xl flex flex-col justify-center items-center m-4 p-4 gap-4'>
        <Image src="/bluelogo.webp" alt="NeutroNet" width={150} height={30} />
        <div>
          アカウントがない状態でログインを行うとユーザー情報が新規登録されます。<br />
          <TermsOfServiceSpan /> および <PrivacyPolicySpan /> をご確認いただき、同意いただける場合のみログインを行ってください。
        </div>
        {providers && Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <FederatedSignInButton provider={provider} />
          </div>
        ))}
      </div>
    </div>
  )
}

const TermsOfServiceSpan = () => {
  return (
    <span className="font-bold underline decoration-main-blue text-main-blue">
      <Link 
        href="/terms-of-service.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        利用規約
      </Link>
    </span>
  )
}

const PrivacyPolicySpan = () => {
  return (
    <span className="font-bold underline decoration-main-blue text-main-blue">
      <Link
        href="/privacy-policy.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        プライバシーポリシー
      </Link>
    </span>
  )
}