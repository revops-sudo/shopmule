-- CreateTable
CREATE TABLE "analysis" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "task_id" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "review_count" INTEGER,
    "review_rating" DOUBLE PRECISION,
    "avg_listing_date" TIMESTAMP(3),
    "monthly_search_volume" INTEGER,
    "trendiness" DOUBLE PRECISION,
    "seasonality" INTEGER,
    "rev_per_month" DOUBLE PRECISION,
    "units_sold_per_month" INTEGER,
    "pricing" DOUBLE PRECISION,
    "pricing_disparity" DOUBLE PRECISION,
    "margin_factor" DOUBLE PRECISION,
    "liability" INTEGER,
    "complexity" INTEGER,
    "mule_score" INTEGER,

    CONSTRAINT "analysis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "analysis_task_id_key" ON "analysis"("task_id");

-- AddForeignKey
ALTER TABLE "analysis" ADD CONSTRAINT "analysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
