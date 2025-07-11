
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Copy, 
  Download, 
  Mail, 
  MessageCircle,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import { type CareerPlan } from '@/hooks/useCareerPlans';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  plan: CareerPlan;
}

const ShareCareerPlanModal = ({ isOpen, onClose, plan }: Props) => {
  const [shareUrl] = useState(`${window.location.origin}/career-paths/plan/${plan.id}`);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copiat!",
        description: "Link-ul a fost copiat în clipboard."
      });
    } catch (error) {
      toast({
        title: "Eroare",
        description: "Nu am putut copia link-ul.",
        variant: "destructive"
      });
    }
  };

  const shareViaEmail = () => {
    const subject = `Planul meu de carieră: ${plan.title}`;
    const body = `Salut!\n\nVreau să îți prezint planul meu de carieră "${plan.title}".\n\nPoți să îl vezi aici: ${shareUrl}\n\nMulțumesc!`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const shareViaWhatsApp = () => {
    const message = `Vreau să îți prezint planul meu de carieră "${plan.title}": ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
  };

  const exportAsPDF = () => {
    toast({
      title: "În curând!",
      description: "Funcționalitatea de export PDF va fi disponibilă în curând."
    });
  };

  const exportAsImage = () => {
    toast({
      title: "În curând!",
      description: "Funcționalitatea de export imagine va fi disponibilă în curând."
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Partajează planul de carieră</DialogTitle>
          <DialogDescription>
            Alege cum vrei să partajezi planul "{plan.title}".
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Copy Link */}
          <div className="space-y-2">
            <Label>Link de partajare</Label>
            <div className="flex space-x-2">
              <Input value={shareUrl} readOnly className="flex-1" />
              <Button onClick={copyToClipboard} size="sm">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Share Options */}
          <div className="space-y-3">
            <Label>Opțiuni de partajare</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={shareViaEmail} className="justify-start">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
              <Button variant="outline" onClick={shareViaWhatsApp} className="justify-start">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>

          {/* Export Options */}
          <div className="space-y-3">
            <Label>Export</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={exportAsPDF} className="justify-start">
                <FileText className="w-4 h-4 mr-2" />
                PDF
              </Button>
              <Button variant="outline" onClick={exportAsImage} className="justify-start">
                <ImageIcon className="w-4 h-4 mr-2" />
                Imagine
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Închide
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareCareerPlanModal;
