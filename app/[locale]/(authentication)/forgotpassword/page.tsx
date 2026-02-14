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

export default function ForgotPasswordPage() {
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
    mutationFn: async () => {},
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
        <h2 className="text-2xl font-semibold text-white">
          {t("sign_in_title")}
        </h2>
        <p className="text-sm text-slate-300 mt-2">{t("sign_in_subtitle")}</p>
      </div>

      {isLoginError && (
        <div className="text-sm text-red-400 bg-red-900/20 p-2 rounded">
          {error.message}
        </div>
      )}

      <form
        onSubmit={handleSubmit((data) => handleLogin())}
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

        <div className="flex items-center justify-between">
          <Link
            href={`/${locale}/login`}
            className="text-sm text-blue-400 hover:underline"
          >
            {t("login")}
          </Link>

          <button
            type="submit"
            disabled={isPending}
            className="ml-2 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-50"
          >
            {isPending ? t("sending") : t("send_otp")}
          </button>
        </div>
      </form>
    </div>
  );
}
