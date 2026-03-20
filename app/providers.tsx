import { TooltipProvider } from "@/components/ui/tooltip";

/**
 * Providers Component
 *
 * A centralized wrapper for all application-wide React context providers.
 * Any new global providers (like themes, tooltips, or authentication context) 
 * should be nested inside this component.
 *
 * @param {Object} props - The component properties.
 * @param {React.ReactNode} props.children - The child components that will consume the provided contexts.
 * @returns {JSX.Element} The nested provider tree.
 */
export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return <TooltipProvider>{children}</TooltipProvider>;
}
