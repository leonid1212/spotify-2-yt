import { getProviders, signIn } from "next-auth/react";

function Login({ providers }) {
  return (
    <div className="border-2 flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt="" />
      {
        Object.values(providers).map((provider) => (
          <div className="" key={provider.name}>
            <button className="bg-[#18D860] text-white p-5 rounded-lg"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >Login with {provider.name}</button>
          </div>
        ))
      }
    </div>
  )
}

export default Login


export async function getServerSideProps() {
  const providers = await getProviders();
  console.log(providers);
  return {
    props: {
      providers
    }
  }
}