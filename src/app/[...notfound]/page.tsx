import { redirect } from "next/navigation";
export default function NotFoundRedirect() {
  redirect("/under-construction");
  return null;
}