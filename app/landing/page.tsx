import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Brain,
  CheckCircle,
  Clock,
  LineChart,
  Smartphone,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-14 items-center px-4 lg:px-6">
        <Link className="flex items-center justify-center" href="#">
          <Brain className="text-primary h-6 w-6" />
          <span className="ml-2 text-xl font-bold">Neuromia</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            機能
          </Link>
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            料金
          </Link>
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            よくある質問
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    忘却曲線を活用した
                    <br />
                    <span className="text-primary">効率的な学習体験</span>
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Neuromiaは、科学的に実証された忘却曲線に基づいて、あなたの記憶を最適化するフラッシュカードアプリです。
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="px-8">今すぐ始める</Button>
                  <Button variant="outline">詳細を見る</Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg">
                  <img
                    alt="Neuromia App Screenshot"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                    src="/placeholder.svg?height=550&width=450"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-gray-100 py-12 md:py-24 lg:py-32 dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  忘却曲線とは？
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  科学的に実証された学習法
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  エビングハウスの忘却曲線は、時間の経過とともに記憶が急速に減衰することを示しています。Neuromiaは、この曲線を活用して最適なタイミングで復習を促し、長期記憶への定着を実現します。
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold">
                        最適なタイミングでの復習
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        忘れる直前に復習することで、記憶の定着率を最大化します。
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                      <LineChart className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold">
                        パーソナライズされた学習計画
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        あなたの学習パターンに合わせて、最適な復習スケジュールを自動生成します。
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                      <Smartphone className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold">
                        いつでもどこでも学習
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        スマートフォンやタブレットで、場所を選ばず効率的に学習できます。
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <img
                  alt="忘却曲線のグラフ"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                  src="/placeholder.svg?height=400&width=600"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Neuromiaの特徴
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  効率的な学習をサポートする多彩な機能を搭載しています。
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">スペーシング効果</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  最適な間隔で復習することで、記憶の定着率を高めます。
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">AIによる学習分析</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  あなたの学習パターンをAIが分析し、効率的な学習方法を提案します。
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">多様なコンテンツ</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  テキスト、画像、音声など、様々な形式のフラッシュカードに対応しています。
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">進捗管理</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  学習の進捗を視覚的に確認でき、モチベーション維持に役立ちます。
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">オフライン学習</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  インターネット接続がなくても、いつでも学習を継続できます。
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">クラウド同期</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  複数のデバイス間でデータを同期し、シームレスな学習体験を提供します。
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-gray-100 py-12 md:py-24 lg:py-32 dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  今すぐ始めましょう
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Neuromiaで効率的な学習を体験してください。
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <Button className="w-full" size="lg">
                  無料で登録する <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  登録は30秒で完了します。クレジットカードは必要ありません。
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2025 Neuromia. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            利用規約
          </Link>
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            プライバシーポリシー
          </Link>
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            お問い合わせ
          </Link>
        </nav>
      </footer>
    </div>
  );
}
