import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { LayoutDashboard, PenBox } from "lucide-react";
import { checkUser } from "@/lib/checkUser";


const Header = async() => { 
  await checkUser();
  
  return (
    <div className="fixed top-0 w-full bg-teal-50 backdrop-blur-md z-50 border-b">

      <nav className="container mx-auto px-2 py-4 flex items-center justify-between">
        <Link href="/">
         <Image src={"/logo.png"}
          alt="FinIntel Logo"
          height={60}
          width={200}
          className="h-12 w-auto object-contain"
         />
        </Link>


      <div className="flex items-center space-x-4">

        <SignedIn>
           <Link href={"/dashboard"}
            className="text-gray-600 hover:text-blue-600 flex items-center gap-2">
            <Button varient="outline" className="bg-gradient-to-br from-emerald-600 via-teal-800 to-blue-00 hover:bg-emerald-600">
              <LayoutDashboard size={18} />
             <span className="hidden md:inline">Dashboard</span>
            </Button>
           </Link> 

           <Link href={"/transaction/create"}>
            <Button  className="flex items-center gap-2 bg-gradient-to-br from-emerald-600 via-teal-800 to-blue-00 hover:bg-emerald-600">
              <PenBox size={18} />
             <span className="hidden md:inline">Transaction</span>
            </Button>
           </Link>  
        </SignedIn>

        <SignedOut>
          <SignInButton forceRedirectUrl="/dashboard">
            <Button varient="outline" className="bg-gradient-to-br from-emerald-600 via-teal-800 to-blue-00 hover:bg-emerald-600">Login</Button>
          </SignInButton>
          {/* <SignUpButton /> */}
        </SignedOut>

        <SignedIn>
          <UserButton className="bg-gradient-to-br from-emerald-600 via-teal-800 to-blue-00 hover:bg-emerald-600" appearance={{
            elements: {
              avatarBox: "w-10 h-10"
            }
          }}/>
        </SignedIn>

      </div>
     </nav>
    </div>
  )
}

export default Header;