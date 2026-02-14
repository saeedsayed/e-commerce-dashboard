import { Link } from "@/i18n/navigation";

const Logo = () => {
  return (
    <div className="flex items-center">
      <Link
        href={`/`}
        className="inline-flex items-center gap-3 text-white no-underline"
      >
        <span className="w-11 h-11 rounded-lg bg-blue-600 grid place-items-center font-bold text-white">
          E
        </span>
        <span className="font-bold text-lg">E-Shop</span>
      </Link>
    </div>
  );
};

export default Logo;
