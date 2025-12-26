import { Mail, Github, Linkedin, Instagram, BookOpen } from 'lucide-react';

// Centralized social links configuration
// Update your links here and they will reflect across all pages
export const socialLinks = [
  { 
    icon: Mail, 
    label: 'Email', 
    value: 'gimansabandara2001@gmail.com', 
    link: 'mailto:gimansabandara2001@gmail.com', 
    color: 'from-red-600 to-pink-600' 
  },
  { 
    icon: Github, 
    label: 'GitHub', 
    value: '@ShashmithaBan', 
    link: 'https://github.com/ShashmithaBan', 
    color: 'from-gray-700 to-gray-900' 
  },
  { 
    icon: Linkedin, 
    label: 'LinkedIn', 
    value: 'Shashmitha Bandara', 
    link: 'https://www.linkedin.com/in/shashmitha-bandara-90180225a/', 
    color: 'from-blue-600 to-blue-800' 
  },
  { 
    icon: Instagram, 
    label: 'Instagram', 
    value: '@shashmitha_001', 
    link: 'https://www.instagram.com/shashmitha_001/', 
    color: 'from-pink-600 to-yellow-600' 
  },
  { 
    icon: BookOpen, 
    label: 'Medium', 
    value: '@gimansabandara2001', 
    link: 'https://medium.com/@gimansabandara2001', 
    color: 'from-gray-800 to-black' 
  }
];

// Quick access links for hero/navigation sections
export const quickLinks = {
  github: 'https://github.com/ShashmithaBan',
  linkedin: 'https://www.linkedin.com/in/shashmitha-bandara-90180225a/',
  instagram: 'https://www.instagram.com/shashmitha_001/',
  medium: 'https://medium.com/@gimansabandara2001',
  email: 'mailto:gimansabandara2001@gmail.com'
};

// WhatsApp configuration for "Hire Me" button
// Update phoneNumber with your international format number (without + or spaces)
export const whatsappConfig = {
  phoneNumber: '94778294885', // Replace with your actual number (Sri Lanka example: 94XXXXXXXXX)
  defaultMessage: "Hi Shashmitha, I saw your portfolio and would like to discuss a project!",
  getLink: function(customMessage) {
    const message = encodeURIComponent(customMessage || this.defaultMessage);
    return `https://wa.me/${this.phoneNumber}?text=${message}`;
  }
};
