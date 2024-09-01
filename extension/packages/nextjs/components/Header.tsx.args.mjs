export const menuIconImports = `
import { ArrowsRightLeftIcon, DocumentCheckIcon } from "@heroicons/react/24/outline";
`;

export const menuObjects = `
{
    label: "Create Stream",
    href: "/create-stream",
    icon: <ArrowsRightLeftIcon className="h-4 w-4" />,
  },
  {
    label: "Owned Streams",
    href: "/owned-streams",
    icon: <DocumentCheckIcon className="h-4 w-4" />,
  },
  `;
