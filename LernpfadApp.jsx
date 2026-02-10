
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const levels = [
  { title: 'Novice', range: [0, 200], color: 'bg-gray-300' },
  { title: 'Practitioner', range: [200, 500], color: 'bg-blue-300' },
  { title: 'Specialist', range: [500, 1000], color: 'bg-green-300' },
  { title: 'Professional', range: [1000, 2000], color: 'bg-yellow-300' },
  { title: 'Master', range: [2000, 5000], color: 'bg-purple-400' }
];

const learningPath = [
  {
    stage: 'Novice → Practitioner',
    goal: 'Grundlagen solide aufbauen',
    modules: [
      { name: 'Laudius Logistikmanager', points: 50 },
      { name: 'Excel for Financial Analysis', points: 50 },
      { name: 'Fachkraft SCM (IHK)', points: 100 }
    ]
  },
  {
    stage: 'Practitioner → Specialist',
    goal: 'Spezialwissen in Spedition & Zoll',
    modules: [
      { name: 'Six Sigma Yellow Belt', points: 100 },
      { name: 'Import & Zoll 1x1 + Zollabwicklung Konkret', points: 50 },
      { name: 'IATA Air Cargo Diploma', points: 150 },
      { name: 'ISCEA CISCP', points: 100 }
    ]
  },
  {
    stage: 'Specialist → Professional',
    goal: 'Strategie & Ausschreibungen',
    modules: [
      { name: 'SCPro™ Level 1', points: 200 },
      { name: 'Advanced Tendering (SC 321382)', points: 100 },
      { name: 'FMVA®', points: 200 },
      { name: 'Verkauf & Verhandlung (IHK)', points: 100 }
    ]
  },
  {
    stage: 'Professional → Master',
    goal: 'Leadership & Transformation',
    modules: [
      { name: 'Betriebswirt (IHK)', points: 300 },
      { name: 'SCPro™ Level 2', points: 300 },
      { name: 'CSSCP', points: 100 },
      { name: 'Leadership Programme (HEC/Oxford)', points: 300 }
    ]
  }
];

export default function LernpfadApp() {
  const [points, setPoints] = useState(0);
  const currentLevel = levels.find(level => points >= level.range[0] && points < level.range[1]) || levels[levels.length - 1];
  const totalPoints = 2500;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">🎓 Jason's Lernpfad zur Logistik-Guru-Stufe</h1>
      <Card className="w-full">
        <CardContent className="py-4">
          <h2 className="text-lg font-semibold">Aktueller Rang: <span className={`${currentLevel.color} px-2 py-1 rounded`}>{currentLevel.title}</span></h2>
          <Progress value={(points / totalPoints) * 100} className="mt-2" />
          <p className="mt-2 text-sm text-gray-600">{points} von {totalPoints} Punkten erreicht</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="0">
        <TabsList>
          {learningPath.map((stage, idx) => (
            <TabsTrigger key={idx} value={String(idx)}>{stage.stage}</TabsTrigger>
          ))}
        </TabsList>
        {learningPath.map((stage, idx) => (
          <TabsContent key={idx} value={String(idx)}>
            <Card className="mt-4">
              <CardContent className="space-y-4">
                <h3 className="text-xl font-semibold">{stage.goal}</h3>
                {stage.modules.map((mod, i) => (
                  <div key={i} className="flex justify-between items-center border-b pb-2">
                    <span>{mod.name}</span>
                    <Button variant="secondary" size="sm" onClick={() => setPoints(p => p + mod.points)}>✅ Abschließen (+{mod.points} P)</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
