import { Link as I18Link } from "@/i18n/navigation";
import { LinkProps } from "next/link";

const Link = (props: LinkProps) => {
  return <I18Link {...props}>Link</I18Link>;
};

export default Link;
