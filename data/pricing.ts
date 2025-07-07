import { Crown, Star, Zap } from "lucide-react";

export const plans = [
    {
      name: "Starter",
      icon: Star,
      price: "Free",
      period: "forever",
      description: "Perfect for personal projects and small businesses",
      features: [
        "5 downloads per month",
        "Standard resolution images",
        "Basic search filters",
        "Community support",
        "Personal license"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Professional",
      icon: Crown,
      price: "$29",
      period: "per month",
      description: "Ideal for creative professionals and growing teams",
      features: [
        "100 downloads per month",
        "High resolution images",
        "Advanced search & filters",
        "Priority support",
        "Commercial license",
        "Early access to new content",
        "Exclusive collections"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      name: "Enterprise",
      icon: Zap,
      price: "$99",
      period: "per month",
      description: "For large teams and organizations with high volume needs",
      features: [
        "Unlimited downloads",
        "Ultra high resolution images",
        "Custom integrations",
        "Dedicated account manager",
        "Extended commercial license",
        "Custom licensing options",
        "Team management tools",
        "Analytics & reporting"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      popular: false
    }
  ];