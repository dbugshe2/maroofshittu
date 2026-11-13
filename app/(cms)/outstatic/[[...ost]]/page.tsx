import "outstatic/outstatic.css";
import { Outstatic } from "outstatic";
import { OstClient } from "outstatic/client";

export default async function Page({
  params,
}: {
  params: Promise<{ ost?: string[] }>;
}) {
  const ostData = await Outstatic();
  const { ost } = await params;
  return <OstClient ostData={ostData} params={{ ost: ost ?? [] }} />;
}
