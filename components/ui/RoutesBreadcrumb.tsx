"use client";
import { Link } from "@/i18n/navigation";
import { Breadcrumb, Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

const RoutesBreadcrumb = () => {
  const pathname = usePathname();
  const arrPathname = pathname.split("/").filter((path) => path !== "ar");
  arrPathname.shift();
  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        {arrPathname.map((path) => (
          <Fragment key={path}>
            {" "}
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Link
                href={
                  "/" +
                  arrPathname.slice(0, arrPathname.indexOf(path) + 1).join("/")
                }
              >
                <Text _hover={{ color: "fg" }}>{path}</Text>
              </Link>
            </Breadcrumb.Item>
          </Fragment>
        ))}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
};

export default RoutesBreadcrumb;
