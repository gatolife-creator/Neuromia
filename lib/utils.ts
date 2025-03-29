import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function milisecToTime(milisec: number) {
  if (milisec < 1000) return "1秒後";
  if (milisec < 60 * 1000) return `${Math.floor(milisec / 1000)}秒後`;
  if (milisec < 60 * 60 * 1000)
    return `${Math.floor(milisec / (60 * 1000))}分後`;
  if (milisec < 24 * 60 * 60 * 1000)
    return `${Math.floor(milisec / (60 * 60 * 1000))}時間後`;
  if (milisec < 30 * 24 * 60 * 60 * 1000)
    return `${Math.floor(milisec / (24 * 60 * 60 * 1000))}日後`;
  if (milisec < 365 * 24 * 60 * 60 * 1000)
    return `${Math.floor(milisec / (30 * 24 * 60 * 60 * 1000))}ヶ月後`;
  return `${Math.floor(milisec / (365 * 24 * 60 * 60 * 1000))}年後`;
}
