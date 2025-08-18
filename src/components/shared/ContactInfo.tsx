import { Mail, Phone, MapPin } from "lucide-react";

interface ContactInfoProps {
  className?: string;
}

export function ContactInfo({ className = "" }: ContactInfoProps) {
  const contactItems = [
    {
      icon: Mail,
      title: "Email",
      info: "contato@pratoamigo.com.br",
    },
    {
      icon: Phone,
      title: "Telefone",
      info: "(11) 99999-9999",
    },
    {
      icon: MapPin,
      title: "Endereço",
      info: "Av. Paulista, 1000 - São Paulo, SP",
    },
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {contactItems.map((item, index) => (
        <div key={index} className="flex items-start">
          <div className="mr-4 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <item.icon className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{item.title}</h3>
            <p className="text-gray-700">{item.info}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
