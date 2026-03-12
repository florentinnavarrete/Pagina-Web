
import { 
  Database,
  Code,
  Brain,
  Rocket,
  Menu,
  X,
  MessageCircle,
  Send,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Download,
  ChevronRight,
  Bot,
  Globe,
  UserPlus,
  Share2,
  Map,
  Instagram,
  UsersRound,
  Copy,
  ExternalLink,
  MessageSquare,
  Users,
  FileText
} from 'lucide-react';

// Custom X Icon Component
const XIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

// Custom TikTok Icon Component
const TikTokIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export const Icons = {
  Database,
  Code,
  Brain,
  Rocket,
  Menu,
  X,
  MessageCircle,
  Send,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Download,
  ChevronRight,
  Bot,
  Globe,
  UserPlus,
  Share2,
  Map,
  Instagram,
  UsersRound,
  Copy,
  ExternalLink,
  Message: MessageSquare,
  Users,
  FileText,
  XIcon,
  TikTok: TikTokIcon
};

export type IconName = keyof typeof Icons;
