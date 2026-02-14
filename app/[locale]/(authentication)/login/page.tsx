"use client";

import Link from "next/link";

import Input from "@/components/common/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "@/schemas/login.schema";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useLocale, useTranslations } from "next-intl";
import { useAuthContext } from "@/context/authProvider";
import { useRouter } from "@/i18n/navigation";

export default function LoginPage() {
  const t = useTranslations("auth");
  const router = useRouter();
  const locale = useLocale();
  const { loginFn } = useAuthContext();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(loginSchema) });

  const {
    mutate: handleLogin,
    isPending,
    isError: isLoginError,
    error,
  } = useMutation({
    mutationFn: loginFn,
    onSuccess: () => {
      toast.success(t("login_successful"));
      router.push("/statistics");
    },
    onError: (err) => {
      toast.error(err?.message);
    },
    onMutate: () => {
      reset();
    },
  });

  return (
    <div className="space-y-6">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-semibold ">
          {t("sign_in_title")}
        </h2>
        <p className="text-sm  mt-2">{t("sign_in_subtitle")}</p>
      </div>

      {isLoginError && (
        <div className="text-sm text-red-400 bg-red-900/20 p-2 rounded">
          {error.message}
        </div>
      )}

      <form
        onSubmit={handleSubmit((data) => handleLogin(data))}
        className="space-y-4"
      >
        <Input
          id="email"
          label={t("email_label")}
          type="email"
          err={!!errors.email}
          errMes={errors.email?.message}
          placeholder={t("email_placeholder")}
          register={register("email")}
          disabled={isPending}
        />
        <Input
          id="password"
          label={t("password_label")}
          type="password"
          err={!!errors.password}
          errMes={errors.password?.message}
          placeholder={t("password_placeholder")}
          register={register("password")}
          disabled={isPending}
        />

        <Link
          href={`/${locale}/forgotpassword`}
          className="text-sm hover:underline text-primary"
        >
          {t("forgot")}
        </Link>

        <div className="flex items-center justify-between">
          <div>
            <Input
              id="rememberMe"
              label={t("remember_me")}
              type="checkbox"
              register={register("rememberMe")}
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="btn btn-primary"
          >
            {isPending ? t("signing_in") : t("sign_in")}
          </button>
        </div>
      </form>
    </div>
  );
}
