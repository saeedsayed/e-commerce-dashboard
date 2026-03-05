"use client";

import Input from "@/components/common/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "@/schemas/login.schema";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { useAuthContext } from "@/context/authProvider";
import { Link, useRouter } from "@/i18n/navigation";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Checkbox from "@/components/common/Checkbox";

export default function LoginPage() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const { loginFn } = useAuthContext();
  const {
    handleSubmit,
    control,
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
    <Box spaceY={6}>
      <Box>
        <Heading textAlign={"center"}>{t("sign_in_title")}</Heading>
        <Text mt={2}>{t("sign_in_subtitle")}</Text>
      </Box>

      {isLoginError && (
        <Text
          color={"red.border"}
          rounded={"md"}
          border={"1px solid"}
          borderColor={"red.border"}
          px={2}
        >
          {error.message}
        </Text>
      )}

      <form
        onSubmit={handleSubmit((data) => handleLogin(data))}
        className="space-y-4!"
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

        <Link href={`/forgotpassword`}>
          <Text _hover={{ textDecoration: "underline" }}>{t("forgot")}</Text>
        </Link>

        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <div>
            <Checkbox
              name="rememberMe"
              control={control}
              label={t("remember_me")}
              err={!!errors?.rememberMe}
              errMes={errors.rememberMe?.message}
            />
          </div>

          <Button
            type="submit"
            loading={isPending}
            loadingText={t("signing_in")}
          >
            {t("sign_in")}
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
