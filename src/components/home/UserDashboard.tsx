
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTestResults } from '@/hooks/useTestResults';
import { useCareerPlans } from '@/hooks/useCareerPlans';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  BarChart3, 
  Target, 
  Trophy,
  TrendingUp,
  Clock,
  Users,
  Heart,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const UserDashboard = () => {
  const { user } = useAuth();
  const { testResults } = useTestResults();
  const { careerPlans } = useCareerPlans();

  const testCategories = [
    {
      icon: Brain,
      title: 'Emotional Intelligence',
      description: 'Understand and manage emotions effectively',
      color: 'bg-blue-100 text-blue-600',
      tests: 1
    },
    {
      icon: Users,
      title: 'Personality Assessment',
      description: 'Discover your unique personality traits',
      color: 'bg-purple-100 text-purple-600',
      tests: 5
    },
    {
      icon: Target,
      title: 'Leadership Skills',
      description: 'Evaluate your leadership potential',
      color: 'bg-green-100 text-green-600',
      tests: 1
    },
    {
      icon: Heart,
      title: 'Wellness & Balance',
      description: 'Assess your work-life balance',
      color: 'bg-pink-100 text-pink-600',
      tests: 2
    }
  ];

  // Calculate real stats
  const testsCompleted = testResults.length;
  const careerPlansCount = careerPlans.length;
  const avgProgress = careerPlans.length 
    ? Math.round(careerPlans.reduce((sum, plan) => sum + (plan.progress_percentage || 0), 0) / careerPlans.length)
    : 0;
  const timeSaved = testsCompleted * 2; // Estimate 2 hours saved per test

  const quickStats = [
    {
      title: 'Tests Completed',
      value: testsCompleted.toString(),
      icon: BarChart3,
      color: 'text-blue-600'
    },
    {
      title: 'Career Plans',
      value: careerPlansCount.toString(),
      icon: Target,
      color: 'text-green-600'
    },
    {
      title: 'Time Saved',
      value: `${timeSaved}h`,
      icon: Clock,
      color: 'text-orange-600'
    },
    {
      title: 'Career Progress',
      value: `${avgProgress}%`,
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="pt-28">
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.user_metadata?.full_name || 'User'}! 👋
            </h1>
            <p className="text-gray-600 mt-2">
              Ready to unlock your potential and build your extraordinary career?
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {quickStats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Start Assessment */}
            <Card className="border-2 border-dashed border-blue-200 hover:border-blue-400 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                  <CardTitle className="text-xl">Discover What Makes You Unique</CardTitle>
                </div>
                <CardDescription>
                  Take your first assessment to unlock personalized insights about your strengths and potential
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/tests">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Start Your Journey
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Career Planning */}
            <Card className="border-2 border-dashed border-green-200 hover:border-green-400 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Target className="w-6 h-6 text-green-600" />
                  <CardTitle className="text-xl">Build Your Future</CardTitle>
                </div>
                <CardDescription>
                  Create a personalized career plan with AI-powered guidance and actionable steps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/career-paths">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Explore Career Hub
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Assessment Categories Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-6 h-6 text-yellow-600" />
                <span>Assessment Categories</span>
              </CardTitle>
              <CardDescription>
                Explore different areas of your professional and personal development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testCategories.map((category, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${category.color}`}>
                        <category.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{category.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                        <Badge variant="secondary" className="mt-2">
                          {category.tests} {category.tests === 1 ? 'test' : 'tests'} available
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link to="/tests">
                  <Button variant="outline" className="w-full">
                    View All Assessments
                    <Sparkles className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
