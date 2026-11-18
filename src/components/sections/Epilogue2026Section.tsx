"use client";

import React, { useState } from "react";
import { soundFx } from "@/lib/soundFx";

export function Epilogue2026Section() {
  const [spotPos, setSpotPos] = useState({ x: 50, y: 42, active: false });
  const [revealPercent, setRevealPercent] = useState(0);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotPos({ x, y, active: true });
  };

  return (
    <section
      id="epilogue-2026"
      className="relative bg-[#070606] py-24 sm:py-36 px-5 sm:px-10 lg:px-14 pb-36"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Top Epilogue Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-20">
          <div className="lg:col-span-6">
            <div className="font-mono text-[11px] tracking-[0.22em] text-[#A81323] uppercase mb-3">
              HỒI V // KHÚC TRÁNG CA 2026 &amp; LỜI HẸN 2029
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl leading-[0.98] text-[#EAE3D2]">
              Khi Tất Cả Đã Đổi Thay,
              <span className="block italic text-[#C5A059] mt-1">
                Chỉ Còn Vị Vua Đứng Lại.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-6 space-y-5 text-sm sm:text-base text-[#EAE3D2]/75 leading-relaxed font-light">
            <p>
              Năm 2025, người ta từng rơi nước mắt khi thấy Zeus khoác màu áo
              khác, rồi vỡ òa khi Doran – Oner – Faker – Gumayusi – Keria hoàn
              tất cú <strong className="text-[#EAE3D2] font-medium">Three-Peat</strong>{" "}
              lịch sử tại Thành Đô — mang về ngôi sao thứ sáu cho T1.
            </p>
            <p>
              Đến năm 2026, giọt nước mắt lại rơi một lần nữa khi Gumayusi nói
              lời từ biệt để sang HLE. Giữa muôn vàn hoài nghi, Faker (tuổi 30),
              Oner và Keria nắm tay Doran cùng chàng xạ thủ trẻ Peyz đi qua từng
              vòng đấu sinh tử, tiến thẳng vào{" "}
              <strong className="text-[#EAE3D2] font-medium">
                Bán kết Worlds 2026
              </strong>{" "}
              trước khi dừng bước sau cuộc huyết chiến với BLG.
            </p>
            <p className="font-serif italic text-xl text-[#C5A059]">
              Không có nỗi buồn nào vô nghĩa. Với bản hợp đồng kéo dài đến năm
              2029, câu chuyện của Lee Sang-hyeok vẫn đang được viết tiếp.
            </p>
          </div>
        </div>

        {/* Interactive Cursor Spotlight Time-Portal: 2026 Faker <-> 2013 Faker */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div
              onPointerMove={handlePointerMove}
              onPointerEnter={() => {
                soundFx.playWarp();
                setSpotPos((prev) => ({ ...prev, active: true }));
              }}
              onPointerLeave={() =>
                setSpotPos((prev) => ({ ...prev, active: false }))
              }
              className="relative archival-frame overflow-hidden bg-[#0b0909] select-none cursor-crosshair"
            >
              {/* Base Image: 2026 Faker (30 years old) */}
              <img
                src="/images/t1/faker-2026.png"
                alt="Faker năm 2026 — Mười bốn năm sau ngày ra mắt"
                className="w-full aspect-[16/11] object-cover object-top archival-photo archival-photo-active"
              />

              {/* Spotlight Reveal Layer: 2013 Rookie Faker (17 years old) */}
              <div
                className="absolute inset-0 pointer-events-none transition-[clip-path,opacity] duration-200"
                style={{
                  clipPath: spotPos.active
                    ? `circle(140px at ${spotPos.x}% ${spotPos.y}%)`
                    : revealPercent > 0
                    ? `inset(0 ${100 - revealPercent}% 0 0)`
                    : "circle(0px at 50% 50%)",
                }}
              >
                <img
                  src="/images/t1/faker-2013.jpg"
                  alt="Faker năm 2013 — Cậu thiếu niên 17 tuổi tại Staples Center"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 ring-2 ring-inset ring-[#C5A059]/60" />
                <div className="absolute bottom-4 left-4 museum-glass px-3 py-1 rounded-full font-mono text-[10px] tracking-[0.18em] text-[#C5A059]">
                  KÝ ỨC 2013 · TUỔI 17
                </div>
              </div>

              {/* Bottom Scrim & Label */}
              <div
                className="absolute inset-x-0 bottom-0 p-5 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(7,6,6,0.92), transparent)",
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] tracking-[0.18em]">
                  <span className="text-[#EAE3D2]/85">
                    CỔNG THỜI GIAN // 2026 ↔ 2013
                  </span>
                  <span className="text-[#C5A059]">
                    DI CHUỘT VÀO ẢNH ĐỂ NHÌN THẤY TUỔI 17
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile / Touch fallback slider */}
            <div className="mt-4 flex items-center gap-4 lg:hidden">
              <span className="font-mono text-[10px] text-[#9A9284]">2026</span>
              <input
                type="range"
                min={0}
                max={100}
                value={revealPercent}
                onChange={(e) => setRevealPercent(Number(e.target.value))}
                aria-label="Kéo để so sánh ảnh năm 2026 và 2013"
                className="flex-1 accent-[#C5A059]"
              />
              <span className="font-mono text-[10px] text-[#C5A059]">2013</span>
            </div>
          </div>

          {/* Right Epilogue Ledger */}
          <div className="lg:col-span-5 archival-frame bg-[#0c0a0a] p-7 sm:p-10 space-y-6">
            <div className="font-mono text-[11px] tracking-[0.2em] text-[#C5A059]">
              BIÊN BẢN LỊCH SỬ // 2013 — 2026
            </div>

            <blockquote className="font-serif italic text-2xl sm:text-3xl text-[#EAE3D2] leading-snug">
              &ldquo;Phong độ là nhất thời. Đẳng cấp là mãi mãi. Và có những vị
              vua vẫn đứng đó khi tất cả đã rời đi.&rdquo;
            </blockquote>

            <div className="divide-y divide-[rgba(234,227,210,0.1)] font-mono text-xs">
              <div className="py-3 flex items-center justify-between gap-4">
                <span className="text-[#9A9284]">NGÔI SAO WORLDS</span>
                <span className="text-[#C5A059]">
                  6★ (2013, &rsquo;15, &rsquo;16, &rsquo;23, &rsquo;24, &rsquo;25)
                </span>
              </div>
              <div className="py-3 flex items-center justify-between gap-4">
                <span className="text-[#9A9284]">KỲ TÍCH THÀNH ĐÔ 2025</span>
                <span className="text-[#EAE3D2]">3–2 vs KT (Three-Peat)</span>
              </div>
              <div className="py-3 flex items-center justify-between gap-4">
                <span className="text-[#9A9284]">ĐỘI HÌNH BI TRÁNG 2026</span>
                <span className="text-[#EAE3D2]">
                  Doran · Oner · Faker · Peyz · Keria
                </span>
              </div>
              <div className="py-3 flex items-center justify-between gap-4">
                <span className="text-[#9A9284]">WORLDS 2026</span>
                <span className="text-[#A81323]">Bán Kết (Top 3–4 vs BLG)</span>
              </div>
              <div className="py-3 flex items-center justify-between gap-4">
                <span className="text-[#9A9284]">LỜI THỀ TƯƠNG LAI</span>
                <span className="text-[#EAE3D2]">Faker gắn bó đến 2029</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
