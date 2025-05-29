import { SignIn } from "@clerk/nextjs"


const page = () => {
  return (
    <div className="bg-teal-100">
        <SignIn className="bg-teal-100"/>
    </div>
  )
}

export default page