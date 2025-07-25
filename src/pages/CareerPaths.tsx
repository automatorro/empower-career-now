
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSubscription } from '@/hooks/useSubscription';
import { useCareerPlans } from '@/hooks/useCareerPlans';
import { useLanguage } from '@/hooks/useLanguage';
import { useIsMobile } from '@/hooks/use-mobile';
import HomeNavigation from '@/components/home/HomeNavigation';
import Footer from '@/components/home/Footer';
import CareerDashboardReal from '@/components/career/CareerDashboardReal';
import CreateCareerPlanEnhanced from '@/components/career/CreateCareerPlanEnhanced';
import CareerPlanDetails from '@/components/career/CareerPlanDetails';
import AIMentoringWithLimits from '@/components/career/AIMentoringWithLimits';
import AIPrograms14Days from '@/components/premium/AIPrograms14Days';
import AIProgressSheets from '@/components/premium/AIProgressSheets';
import AISimulations from '@/components/premium/AISimulations';
import ProgressTracking from '@/components/premium/ProgressTracking';

const CareerPaths = () => {
  const { planId } = useParams();
  const { subscription } = useSubscription();
  const { careerPlans } = useCareerPlans();
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  // If we have a planId in the route, show the details page
  if (planId) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HomeNavigation />
        <div className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <CareerPlanDetails />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const getSubscriptionFeatures = () => {
    if (!subscription) return { maxPlans: 1, hasAI: false };
    
    switch (subscription.subscription_type) {
      case 'premium':
        return { maxPlans: 999, hasAI: true };
      case 'professional':
        return { maxPlans: 999, hasAI: false };
      default:
        return { maxPlans: 1, hasAI: false };
    }
  };

  const features = getSubscriptionFeatures();

  return (
    <div className="min-h-screen bg-gray-50">
      <HomeNavigation />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{t('careerPaths.title')}</h1>
            <p className="text-gray-600 mt-2">
              {t('careerPaths.subtitle')}
            </p>
          </div>

          <Tabs defaultValue="my-plans" className="space-y-6">
            {isMobile ? (
              // Mobile layout: horizontal scroll
              <div className="overflow-x-auto">
                <TabsList className="flex w-max min-w-full space-x-1 p-1">
                  <TabsTrigger value="my-plans" className="whitespace-nowrap">
                    {t('careerPaths.tabs.dashboard')}
                  </TabsTrigger>
                  <TabsTrigger value="create-plan" className="whitespace-nowrap">
                    {t('careerPaths.tabs.create')}
                  </TabsTrigger>
                  <TabsTrigger value="ai-mentoring" className="whitespace-nowrap">
                    {t('careerPaths.tabs.mentoring')}
                  </TabsTrigger>
                  {features.hasAI && (
                    <>
                      <TabsTrigger value="ai-programs" className="whitespace-nowrap">
                        {t('premiumFeatures.aiPrograms.title')}
                      </TabsTrigger>
                      <TabsTrigger value="progress-sheets" className="whitespace-nowrap">
                        {t('premiumFeatures.progressSheets.title')}
                      </TabsTrigger>
                      <TabsTrigger value="ai-simulations" className="whitespace-nowrap">
                        {t('premiumFeatures.simulations.title')}
                      </TabsTrigger>
                      <TabsTrigger value="progress-analytics" className="whitespace-nowrap">
                        {t('premiumFeatures.progressTracking.title')}
                      </TabsTrigger>
                    </>
                  )}
                </TabsList>
              </div>
            ) : (
              // Desktop layout: grid
              <TabsList className={`grid w-full ${features.hasAI ? 'grid-cols-7' : 'grid-cols-3'}`}>
                <TabsTrigger value="my-plans">{t('careerPaths.tabs.dashboard')}</TabsTrigger>
                <TabsTrigger value="create-plan">{t('careerPaths.tabs.create')}</TabsTrigger>
                <TabsTrigger value="ai-mentoring">{t('careerPaths.tabs.mentoring')}</TabsTrigger>
                {features.hasAI && (
                  <>
                    <TabsTrigger value="ai-programs">{t('premiumFeatures.aiPrograms.title')}</TabsTrigger>
                    <TabsTrigger value="progress-sheets">{t('premiumFeatures.progressSheets.title')}</TabsTrigger>
                    <TabsTrigger value="ai-simulations">{t('premiumFeatures.simulations.title')}</TabsTrigger>
                    <TabsTrigger value="progress-analytics">{t('premiumFeatures.progressTracking.title')}</TabsTrigger>
                  </>
                )}
              </TabsList>
            )}

            <TabsContent value="my-plans" className="space-y-6">
              <CareerDashboardReal />
            </TabsContent>

            <TabsContent value="create-plan" className="space-y-6">
              <CreateCareerPlanEnhanced 
                maxPlans={features.maxPlans}
                currentPlansCount={careerPlans.length}
              />
            </TabsContent>

            <TabsContent value="ai-mentoring" className="space-y-6">
              <AIMentoringWithLimits />
            </TabsContent>

            {features.hasAI && (
              <>
                <TabsContent value="ai-programs" className="space-y-6">
                  <AIPrograms14Days />
                </TabsContent>

                <TabsContent value="progress-sheets" className="space-y-6">
                  <AIProgressSheets />
                </TabsContent>

                <TabsContent value="ai-simulations" className="space-y-6">
                  <AISimulations />
                </TabsContent>

                <TabsContent value="progress-analytics" className="space-y-6">
                  <ProgressTracking />
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CareerPaths;
