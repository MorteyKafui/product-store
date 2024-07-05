import Link from "next/link";
import Logo from "./Logo";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="border-b border-teal-500">
      <div className="max-w-5xl mx-auto px-8 py-4 flex gap-8 items-center">
        <Link href={"/"}>
          <Logo />
        </Link>
        <ul className="flex gap-4 items-center justify-between ml-10">
          <li>
            <Link href={"/"}>products</Link>
          </li>
          <li>
            <Link href={"/create-product"}>create product</Link>
          </li>
        </ul>
        <div className="flex gap-4 items-center ml-auto">
          <Button>Login</Button>
          <Button variant={"outline"}>Log out</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
