"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Legend,
} from "recharts";
import { AlertTriangle, Loader } from "lucide-react";
import {
  ChartTooltip,
  ChartTooltipContent,
  ChartContainer,
} from "@/components/ui/chart";
import RecentIntrusionsTable from "@/components/recent-intrusion-table";

const animals = [
  "Bear",
  "Boar",
  "Cattle",
  "Deer",
  "Elephant",
  "Horse",
  "Monkey",
];

const colors = {
  Bear: "#C3F0CA",
  Boar: "#A7D08B",
  Cattle: "#76C843",
  Deer: "#58A55C",
  Elephant: "#4C9A2A",
  Horse: "#3E8E41",
  Monkey: "#2F6A3A",
};

export default function Dashboard() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentIntrusions, setRecentIntrusions] = useState([]);
  const [users, setUsers] = useState(0);
  const [devices, setDevices] = useState(0);
  const router = useRouter();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
    const raw = localStorage.getItem("user");
    if (raw) {
      const parsed = JSON.parse(raw);
      setUserName(parsed.name); // ✅ Correct usage
    }

    const fetchData = async () => {
      try {
        const res = await fetch("/api/analysis");
        const json = await res.json();
        console.log(json);
        setData(json.message);
        setLoading(false);

        setUsers(json.message.users || 0);
        setDevices(json.message.devices || 0);
        setRecentIntrusions(json.message.recent || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const chartData =
    data?.Dates?.map((date, index) => {
      const entry = { date };
      animals.forEach((animal) => {
        entry[animal] = data[animal]?.[index] || 0;
      });
      return entry;
    }) || [];

  const totalIntrusions = animals.reduce((acc, animal) => {
    acc[animal] = Array.isArray(data?.[animal])
      ? data[animal].reduce((sum, count) => sum + count, 0)
      : 0;
    return acc;
  }, {});

  const grandTotal = Object.values(totalIntrusions).reduce(
    (sum, count) => sum + count,
    0
  );

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="p-4 w-full">
      {loading ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <Loader className="animate-spin h-10 w-10 text-green-600" />
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-green-800 mb-2 mt-2">
            Welcome, {userName}! 👋
          </h1>
          <p className="text-muted-foreground mb-6">
            Here&apos;s your latest overview of the Animal Intrusion Detection
            System.
          </p>
          <div className="flex flex-col lg:flex-row justify-start items-stretch relative space-x-4">
            {/* Chart */}

            <Card className="mb-4 md:w-2/3 relative">
              <CardHeader>
                <CardTitle>Weekly Intrusion Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={colors}
                  className="h-[250px] min-w-fit w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      {animals.map((animal) => (
                        <Bar
                          key={animal}
                          dataKey={animal}
                          fill={colors[animal]}
                          stackId="a"
                        />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            {/* Stats Grid */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:w-2/3 max-w-[350px] gap-4 mb-6 relative">
              <Card>
                <CardHeader>
                  <CardTitle>Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl text-green-700 font-bold">{users}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Devices</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl text-green-700 font-bold">{devices}</p>
                </CardContent>
              </Card>
              <Card className="bg-green-100 shadow col-span-2">
                <CardHeader>
                  <CardTitle>Total Intrusions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-green-800">
                    {grandTotal}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Animal-wise Intrusions */}
            <div>
              <h2 className="text-2xl font-semibold text-green-700 mt-1 mb-2">
                Animal-wise Intrusions
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {animals.map((animal) => (
                  <Card
                    key={animal}
                    className="hover:shadow-lg transition-shadow h-[100px]"
                  >
                    <CardHeader>
                      <CardTitle className="text-green-600 text-sm">
                        {animal}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold -mt-3 text-green-500">
                        {totalIntrusions[animal]}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            {/* Recent Intrusions */}
            <RecentIntrusionsTable recentIntrusions={recentIntrusions} />
          </div>
        </>
      )}
    </div>
  );
}
