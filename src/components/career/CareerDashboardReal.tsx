
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  TrendingUp, 
  Calendar,
  CheckCircle,
  Clock,
  ArrowRight,
  BookOpen,
  Brain,
  Lightbulb,
  Plus,
  Sparkles,
  X,
  ExternalLink,
  PlayCircle
} from 'lucide-react';
import { useCareerPlans } from '@/hooks/useCareerPlans';
import { useCareerRecommendations } from '@/hooks/useCareerRecommendations';
import { useCareerPlanGeneration } from '@/hooks/useCareerPlanGeneration';
import { useTestResults } from '@/hooks/useTestResults';
import { useSubscription } from '@/hooks/useSubscription';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import CareerGoalSelector from './CareerGoalSelector';
import LoadingState from './LoadingState';

const CareerDashboardReal = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { careerPlans, isLoading: plansLoading } = useCareerPlans();
  const { recommendations, dismissRecommendation } = useCareerRecommendations();
  const { generateCareerPlan, generateRecommendations, isGeneratingPlan, isGeneratingRecommendations } = useCareerPlanGeneration();
  const { testResults } = useTestResults();
  const { subscription } = useSubscription();
  const { toast } = useToast();

  const getSubscriptionFeatures = () => {
    if (!subscription) return { maxPlans: 1, hasAI: false, hasAnalytics: false };
    
    switch (subscription.subscription_type) {
      case 'premium':
        return { maxPlans: 999, hasAI: true, hasAnalytics: true };
      case 'professional':
        return { maxPlans: 999, hasAI: false, hasAnalytics: true };
      default:
        return { maxPlans: 1, hasAI: false, hasAnalytics: false };
    }
  };

  const features = getSubscriptionFeatures();

  const handleGenerateCareerPlan = (careerGoal: string) => {
    if (testResults.length === 0) {
      toast({
        title: "Assessment Required",
        description: "To generate a personalized career plan, please complete at least one assessment first.",
        variant: "destructive"
      });
      return;
    }

    generateCareerPlan.mutate({ careerGoal, testResults });
  };

  const handleGenerateRecommendations = () => {
    generateRecommendations.mutate();
  };

  const handleRecommendationAction = (recommendation: any) => {
    // Handle internal navigation
    if (recommendation.action_type === 'internal_navigation') {
      const route = recommendation.action_data?.route;
      if (route) {
        navigate(route);
        return;
      }
    }

    // Handle external links with better validation
    const url = recommendation.action_data?.url;
    if (url && recommendation.action_type === 'external_link') {
      try {
        // Validate URL before opening
        new URL(url); // This will throw if URL is invalid
        window.open(url, '_blank');
        
        // Show helpful message
        toast({
          title: "Link deschis",
          description: `Resursa "${recommendation.title}" s-a deschis într-un tab nou.`,
        });
        return;
      } catch (urlError) {
        console.error('Invalid URL:', url, urlError);
        toast({
          title: "Link invalid",
          description: "Ne pare rău, acest link nu mai este disponibil. Recomandările vor fi actualizate în curând.",
          variant: "destructive"
        });
        return;
      }
    }

    // Fallback based on recommendation type
    switch (recommendation.recommendation_type) {
      case 'test':
        navigate('/assessments');
        break;
      case 'course':
        toast({
          title: "Resurse educaționale",
          description: "Verifică recomandările actualizate cu link-uri validate.",
        });
        break;
      case 'skill':
        navigate('/assessments?category=skills');
        break;
      case 'path':
        navigate('/career-paths?tab=create');
        break;
      case 'certification':
        toast({
          title: "Certificare recomandată",
          description: "Vezi resursa pentru program de certificare."
        });
        break;
      default:
        toast({
          title: "Funcționalitate în dezvoltare",
          description: "Această opțiune va fi disponibilă în curând."
        });
    }
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'skill': return BookOpen;
      case 'path': return Target;
      case 'test': return Brain;
      case 'course': return PlayCircle;
      case 'certification': return Badge;
      default: return Lightbulb;
    }
  };

  const calculateOverallProgress = () => {
    if (careerPlans.length === 0) return 0;
    const totalProgress = careerPlans.reduce((sum, plan) => sum + (plan.progress_percentage || 0), 0);
    return Math.round(totalProgress / careerPlans.length);
  };

  const getTotalCompletedMilestones = () => {
    return careerPlans.reduce((sum, plan) => {
      const estimatedTotal = 5;
      const completed = Math.floor((plan.progress_percentage || 0) / 100 * estimatedTotal);
      return sum + completed;
    }, 0);
  };

  if (plansLoading) {
    return <div>Loading your career plans...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('career.dashboard.activePlans')}</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{careerPlans.length}</div>
            <p className="text-xs text-muted-foreground">
              of {features.maxPlans === 999 ? '∞' : features.maxPlans} available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calculateOverallProgress()}%</div>
            <p className="text-xs text-muted-foreground">
              across all plans
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Milestones</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalCompletedMilestones()}</div>
            <p className="text-xs text-muted-foreground">
              completed this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI Actions */}
      {features.hasAI && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span>AI-Powered Actions</span>
            </CardTitle>
            <CardDescription>
              Generate personalized career plans and recommendations automatically
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <CareerGoalSelector 
              onSelectGoal={handleGenerateCareerPlan}
              isGenerating={isGeneratingPlan}
            >
              <Button 
                disabled={isGeneratingPlan}
                className="flex items-center space-x-2"
              >
                <Brain className="w-4 h-4" />
                <span>{isGeneratingPlan ? 'Generating...' : 'Generate Career Plan'}</span>
              </Button>
            </CareerGoalSelector>
            <Button 
              variant="outline"
              onClick={handleGenerateRecommendations}
              disabled={isGeneratingRecommendations}
              className="flex items-center space-x-2"
            >
              <Lightbulb className="w-4 h-4" />
              <span>{isGeneratingRecommendations ? 'Updating...' : 'Refresh Recommendations'}</span>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Active Career Plans */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{t('career.dashboard.activePlans')}</h2>
          <Button variant="outline" className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>{t('career.dashboard.createPlan')}</span>
          </Button>
        </div>

        {careerPlans.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Target className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No career plans yet</h3>
              <p className="text-gray-600 mb-6">
                {testResults.length === 0 
                  ? 'Complete an assessment first, then you can generate a personalized plan automatically.'
                  : 'Generate a personalized plan based on your assessment results.'
                }
              </p>
              {testResults.length > 0 && features.hasAI ? (
                <CareerGoalSelector 
                  onSelectGoal={handleGenerateCareerPlan}
                  isGenerating={isGeneratingPlan}
                >
                  <Button disabled={isGeneratingPlan}>
                    <Sparkles className="w-4 h-4 mr-2" />
                    {isGeneratingPlan ? 'Generating plan...' : 'Generate AI Plan'}
                  </Button>
                </CareerGoalSelector>
              ) : (
                <Button onClick={() => navigate('/career-paths?tab=create')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Plan
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {careerPlans.map((plan) => (
              <Card key={plan.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{plan.title}</span>
                        {plan.generated_by_ai && (
                          <Badge variant="secondary" className="text-xs">
                            <Brain className="w-3 h-3 mr-1" />
                            AI
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{plan.progress_percentage || 0}%</div>
                      <div className="text-xs text-gray-500">progress</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Progress value={plan.progress_percentage || 0} className="w-full" />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Milestones in progress</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span>Active plan</span>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm font-medium text-blue-900 mb-1">Personalized career plan</div>
                    <div className="text-sm text-blue-700">Continue working towards your goals</div>
                  </div>

                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => navigate(`/career-paths/plan/${plan.id}`)}
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Loading States */}
      {isGeneratingPlan && (
        <LoadingState 
          type="plan" 
          message="Creez un plan personalizat bazat pe testele tale și obiectivele selectate..."
        />
      )}
      
      {isGeneratingRecommendations && (
        <LoadingState 
          type="recommendations" 
          message="Analizez profilul tău pentru a găsi cele mai potrivite resurse și oportunități..."
        />
      )}

      {/* AI Recommendations */}
      {recommendations.length > 0 && !isGeneratingRecommendations && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">AI Recommendations for You</h2>
            {features.hasAI && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleGenerateRecommendations}
                disabled={isGeneratingRecommendations}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {isGeneratingRecommendations ? 'Updating...' : 'Refresh'}
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.slice(0, 6).map((rec) => {
              const Icon = getRecommendationIcon(rec.recommendation_type);
              return (
                <Card key={rec.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg">
                          <Icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <CardTitle className="text-lg">{rec.title}</CardTitle>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => dismissRecommendation.mutate(rec.id)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{rec.description}</p>
                    <div className="flex items-center justify-between">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleRecommendationAction(rec)}
                      >
                        {rec.action_text}
                        {rec.action_type === 'external_link' ? (
                          <ExternalLink className="w-4 h-4 ml-2" />
                        ) : (
                          <ArrowRight className="w-4 h-4 ml-2" />
                        )}
                      </Button>
                      <div className="flex items-center space-x-2 ml-2">
                        <Badge variant="secondary">
                          P{rec.priority}
                        </Badge>
                        {rec.action_data?.platform && (
                          <Badge variant="outline" className="text-xs">
                            {rec.action_data.platform}
                          </Badge>
                        )}
                      </div>
                    </div>
                    {rec.estimated_time_minutes && (
                      <div className="flex items-center space-x-1 mt-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{rec.estimated_time_minutes} min</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerDashboardReal;
