import db from "@/lib/db";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage({
  params,
}: {
  params: { storeId: string };
}) {
  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[400px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center">
            Active Store
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-lg">
            {store?.name ? (
              <>
                ✅ Store:{" "}
                <span className="font-bold text-green-600">{store.name}</span>
              </>
            ) : (
              <span className="text-red-500">Store not found ❌</span>
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
