export interface ChapterMeta {
  id: string;
  roman: string;
  label: string;
}

export interface FilmstripFrame {
  id: string;
  plate: string;
  year: string;
  title: string;
  venue: string;
  scoreOrStatus: string;
  image: string;
  objectPosition: string;
  quote: string;
  narrative: string;
  caption: string;
}

export interface ChronicleSpread {
  id: string;
  roman: string;
  years: string;
  eraLabel: string;
  title: string;
  subtitle: string;
  primaryImage: string;
  primaryCaption: string;
  secondaryImage: string;
  secondaryCaption: string;
  quote: string;
  paragraphs: string[];
  tearsOrTriumph: "TRIUMPH" | "HEARTBREAK" | "RESURRECTION" | "REQUIEM";
}

export interface BrotherhoodPlate {
  id: string;
  ign: string;
  fullName: string;
  role: string;
  era: string;
  statusTag: string;
  image: string;
  objectPosition: string;
  quote: string;
  story: string;
}

export const CHAPTERS: ChapterMeta[] = [
  { id: "hero", roman: "I", label: "Khởi Nguyên" },
  { id: "hall-of-frames", roman: "II", label: "Phim Tư Liệu" },
  { id: "dynasty", roman: "III", label: "Máu & Nước Mắt" },
  { id: "pantheon", roman: "IV", label: "Huynh Đệ" },
  { id: "epilogue-2026", roman: "V", label: "Bi Tráng 2026" },
];

export const AMBIENT_HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4";

export const FILMSTRIP_FRAMES: FilmstripFrame[] = [
  {
    id: "f-2013",
    plate: "PLATE 01",
    year: "2013",
    title: "Cậu Thiếu Niên 17 Tuổi",
    venue: "Staples Center — Los Angeles",
    scoreOrStatus: "NGÔI SAO THỨ NHẤT ★",
    image: "/images/t1/faker-2013.jpg",
    objectPosition: "50% 25%",
    quote: "Người ta gọi cậu là Quỷ Vương Bất Tử khi cậu thậm chí chưa kịp lớn.",
    narrative:
      "Mùa thu 2013, Lee Sang-hyeok đặt chân tới Los Angeles trong bộ đồng phục SKT T1 K giản dị. Chỉ mất 87 phút thi đấu ở chung kết trước Royal Club, cậu nâng chiếc Summoner's Cup đầu tiên — khởi đầu một lời nguyền vinh quang kéo dài hơn một thập kỷ.",
    caption: "Tư liệu 2013: Faker trong màu áo SKT T1 tại Chung kết Thế giới Mùa 3.",
  },
  {
    id: "f-2015",
    plate: "PLATE 02",
    year: "2015–16",
    title: "Đỉnh Cao Cô Độc Của Đế Chế",
    venue: "Berlin & Los Angeles",
    scoreOrStatus: "NGÔI SAO II & III ★★★",
    image: "/images/t1/skt-2015-trophy.jpg",
    objectPosition: "50% 35%",
    quote: "Khi đứng trên đỉnh thế giới ba lần trong bốn năm, thế giới ngỡ cậu không biết khóc.",
    narrative:
      "Berlin 2015 với kỷ lục 15–1 bất bại, rồi Los Angeles 2016 với chiến thắng nghẹt thở 3–2 trước Samsung Galaxy. Cùng Bengi, Bang, Wolf và MaRin, SKT T1 dựng nên vương triều không tưởng — trước khi cơn bão bảy năm không danh hiệu ập xuống.",
    caption: "Tư liệu 2015: SK Telecom T1 bên chiếc Summoner's Cup thứ hai tại Berlin.",
  },
  {
    id: "f-2017",
    plate: "PLATE 03",
    year: "2017",
    title: "Giọt Nước Mắt Tổ Chim Bắc Kinh",
    venue: "Sân Vận Động Tổ Chim — Bắc Kinh",
    scoreOrStatus: "0–3 TRƯỚC SAMSUNG GALAXY",
    image: "/images/t1/faker-2015.jpg",
    objectPosition: "50% 20%",
    quote: "Khoảnh khắc gục xuống bàn phím và ngoái nhìn chiếc cúp, cả thế giới mới hiểu Quỷ Vương cũng biết đau.",
    narrative:
      "Suốt giải đấu 2017, Faker kéo cả một tập thể kiệt sức qua năm ván sinh tử trước RNG bằng năm trận Galio liên tiếp. Nhưng đến trận chung kết ngày 4/11/2017, trước màn hình xám ngắt tại Bắc Kinh, chàng trai 21 tuổi gục mặt khóc nức nở. Không ai ngờ, phải mất sáu năm đằng đẵng sau đó cậu mới chạm lại được ánh vàng ấy.",
    caption: "Tư liệu thời kỳ SKT: Nỗi cô đơn của người gánh cả đế chế trên vai.",
  },
  {
    id: "f-2022",
    plate: "PLATE 04",
    year: "2022",
    title: "Đêm San Francisco Đẫm Lệ",
    venue: "Chase Center — San Francisco",
    scoreOrStatus: "2–3 TRƯỚC DRX",
    image: "/images/t1/zofgk-2022.jpg",
    objectPosition: "50% 25%",
    quote: "Keria gục khóc nức nở giữa sân khấu, còn Faker lặng lẽ nhìn những đứa em mình đau đớn.",
    narrative:
      "Thế hệ ZOFGK tưởng chừng đã nắm chắc chiếc cúp sau chuỗi 18–0 mùa Xuân. Nhưng tại Ván 5 ở San Francisco, Nexus vỡ tan trước DRX. Tiếng khóc xé lòng của Keria vang vọng khắp Chase Center — vết thương ấy biến thành lời thề máu để bốn chàng trai trẻ tiếp tục ở lại bên Faker.",
    caption: "Tư liệu 2022: Năm chàng trai ZOFGK từ đỉnh cao 18–0 đến thử thách nghiệt ngã tại San Francisco.",
  },
  {
    id: "f-2023",
    plate: "PLATE 05",
    year: "2023",
    title: "Cánh Tay Đau & Cú Hất Định Mệnh",
    venue: "Gocheok Sky Dome — Seoul",
    scoreOrStatus: "NGÔI SAO THỨ TƯ ★★★★",
    image: "/images/t1/t1-2023-awards.jpg",
    objectPosition: "50% 25%",
    quote: "Mọi con đường đều dẫn đến tôi.",
    narrative:
      "Mùa hè 2023, chấn thương dây thần kinh tay phải buộc Faker phải nghỉ thi đấu, để rồi T1 lao dốc với thành tích 1–7. Trở lại trong đau đớn, anh cùng ZOFGK hạ gục toàn bộ dàn đại diện LPL với tỉ số 11–1 tại quê nhà Seoul, mà đỉnh cao là cú Azir tốc biến hất tung Ruler giữa vòng vây JDG.",
    caption: "Tư liệu 2023: Đội hình T1 tại Seoul sau chiến tích phục sinh lịch sử.",
  },
  {
    id: "f-2024",
    plate: "PLATE 06",
    year: "2024",
    title: "Đêm London Của Những Kẻ Không Đầu Hàng",
    venue: "The O2 Arena — London",
    scoreOrStatus: "NGÔI SAO THỨ NĂM ★★★★★",
    image: "/images/t1/faker-2024-worlds.jpg",
    objectPosition: "50% 20%",
    quote: "Chiếc cúp thứ năm này là dành cho các bạn.",
    narrative:
      "Bị BLG dẫn 1–2 ngay trên đất Anh, giữa lúc mọi lời tiên tri đều viết sẵn hồi kết, Faker cầm Sylas và Galio xoay chuyển càn khôn trong hai ván cuối cùng. Chiếc cúp thứ năm không chỉ mang lại danh hiệu Finals MVP ở tuổi 28, mà còn là bữa tiệc chia tay cuối cùng không báo trước của ZOFGK.",
    caption: "Tư liệu 2024: Faker tại đấu trường Chung kết Thế giới 2024.",
  },
  {
    id: "f-2025",
    plate: "PLATE 07",
    year: "2025",
    title: "Vết Cắt Chia Ly & Kỳ Tích Thành Đô",
    venue: "Thành Đô — Trung Quốc (09.11.2025)",
    scoreOrStatus: "THREE-PEAT ★ ★★★★★★",
    image: "/images/t1/faker-2025-worlds.jpg",
    objectPosition: "50% 20%",
    quote: "Mất đi một mảnh ghép, T1 vẫn đi qua giông bão để khắc ngôi sao thứ sáu vào lịch sử.",
    narrative:
      "Cuối năm 2024, Zeus rời T1 sang HLE, chấm dứt kỷ nguyên ZOFGK nguyên bản. Doran bước vào giữa muôn vàn hoài nghi, còn Faker ký hợp đồng gắn bó đến 2029. Ngày 9/11/2025 tại Thành Đô, bị KT Rolster dẫn 1–2 trong trận Đại Chiến Viễn Thông sinh tử, Doran – Oner – Faker – Gumayusi – Keria vùng dậy thắng ngược 3–2, lập kỳ tích Three-Peat đầu tiên trong lịch sử.",
    caption: "Tư liệu 2025: Khoảnh khắc hậu trận Chung kết Worlds 2025 tại Thành Đô.",
  },
  {
    id: "f-2026",
    plate: "PLATE 08",
    year: "2026",
    title: "Khúc Tráng Ca Hoàng Hôn Đỏ",
    venue: "Worlds 2026 — Bán Kết Sinh Tử",
    scoreOrStatus: "TOP 3–4 · HÀNH TRÌNH BI TRÁNG",
    image: "/images/t1/faker-2026.png",
    objectPosition: "50% 18%",
    quote: "Không còn giọt nước mắt gục ngã của tuổi 21 — chỉ còn cái cúi đầu kiêu hãnh của một tượng đài ở tuổi 30.",
    narrative:
      "Đầu mùa 2026, Gumayusi cũng rời mái nhà T1 để sang HLE tái ngộ Zeus. Chỉ còn ba người cũ Faker – Oner – Keria sát cánh bên Doran và xạ thủ trẻ Peyz. Suốt năm 2026, T1 phải đối mặt với chính những người anh em từng cùng nâng cúp. Họ chiến đấu kiệt cùng sức lực cho đến tận Bán kết Worlds 2026 trước khi dừng bước trước BLG. Đó không phải một thất bại — đó là bản anh hùng ca bi tráng nhất.",
    caption: "Tư liệu 2026: Lee Sang-hyeok trong cuộc phỏng vấn mùa giải thứ 14.",
  },
];

export const CHRONICLE_SPREADS: ChronicleSpread[] = [
  {
    id: "act-1",
    roman: "I",
    years: "2013 — 2016",
    eraLabel: "BÌNH MINH CỦA VỊ VUA TRẺ",
    title: "Ba Ngôi Sao Khi Thế Giới Ngỡ Cậu Vô Cảm",
    subtitle: "Los Angeles 2013 · Berlin 2015 · Los Angeles 2016",
    primaryImage: "/images/t1/skt-2013-team.jpg",
    primaryCaption: "Đội hình SKT T1 K năm 2013 — nơi huyền thoại bắt đầu.",
    secondaryImage: "/images/t1/skt-2015-trophy.jpg",
    secondaryCaption: "SKT T1 nâng cao chiếc Summoner's Cup năm 2015 tại Berlin.",
    quote:
      "Ở tuổi 17, chiến thắng đến quá nhanh khiến người ta quên rằng đằng sau màn hình máy tính chỉ là một cậu bé.",
    paragraphs: [
      "Khi Faker bước lên sân khấu Staples Center năm 2013, làng Liên Minh Huyền Thoại còn chưa kịp định nghĩa thế nào là một vương triều. Ba danh hiệu Vô địch Thế giới trong bốn mùa giải biến cái tên SK Telecom T1 thành nỗi khiếp sợ tuyệt đối.",
      "Nhưng chính sự thống trị lạnh lùng ấy lại gieo mầm cho nỗi cô đơn sau này: những người đồng đội cũ lần lượt rẽ hướng, còn Faker ở lại, biến chính mình thành cột trụ duy nhất chống đỡ bầu trời đỏ đen.",
    ],
    tearsOrTriumph: "TRIUMPH",
  },
  {
    id: "act-2",
    roman: "II",
    years: "2017 — 2022",
    eraLabel: "ĐÊM BẮC KINH & VẾT THƯƠNG SAN FRANCISCO",
    title: "Bảy Năm Nước Mắt Trong Bóng Tối",
    subtitle: "Tổ Chim 2017 · Những Mùa Hè Rời Xa · Chase Center 2022",
    primaryImage: "/images/t1/zofgk-2022.jpg",
    primaryCaption:
      "Thế hệ trẻ ZOFGK năm 2022 — những người từng khóc cạn nước mắt trước ngưỡng cửa thiên đường.",
    secondaryImage: "/images/t1/faker-2015.jpg",
    secondaryCaption:
      "Ánh mắt trầm lặng của người đội trưởng qua những mùa giải không danh hiệu.",
    quote:
      "Nếu năm 2017 là tiếng nức nở của một chàng trai đơn độc, thì năm 2022 là nỗi đau khi nhìn những đứa em mình gục ngã ngay trước vạch đích.",
    paragraphs: [
      "Tối ngày 4 tháng 11 năm 2017 tại Sân vận động Tổ Chim, hình ảnh Faker gục mặt xuống bàn phím sau thất bại 0–3 trước Samsung Galaxy đã xé nát trái tim hàng triệu người hâm mộ. Năm năm sau tại San Francisco 2022, dù có bốn tài năng trẻ Zeus, Oner, Gumayusi, Keria bên cạnh, T1 lại gục ngã ở Ván 5 trước DRX.",
      "Đêm hôm ấy, Keria ôm mặt khóc run rẩy ngay trên ghế thi đấu. Nhưng không một ai bỏ cuộc. Cả năm người cùng ký tên vào một bản giao ước thầm lặng: quay trở lại, và không bao giờ khóc vì thất bại thêm một lần nào nữa.",
    ],
    tearsOrTriumph: "HEARTBREAK",
  },
  {
    id: "act-3",
    roman: "III",
    years: "2023 — 2024",
    eraLabel: "CÁNH TAY ĐAU & SỰ PHỤC SINH CỦA ZOFGK",
    title: "Từ 1–7 Giữa Mùa Hè Đến Hai Đêm Huy Hoàng Tại Seoul Và London",
    subtitle: "Gocheok Sky Dome 2023 · The O2 Arena 2024",
    primaryImage: "/images/t1/t1-2024-stage.jpg",
    primaryCaption: "T1 trên sân khấu Chung kết Thế giới 2024 trước hàng vạn khán giả.",
    secondaryImage: "/images/t1/t1-2023-awards.jpg",
    secondaryCaption: "Năm gương mặt ZOFGK bên nhau sau cuộc phục sinh 2023.",
    quote:
      "Cả đôi tay run rẩy vì chấn thương dây thần kinh cũng không ngăn được anh vẽ nên đường cong định mệnh.",
    paragraphs: [
      "Mùa hè 2023, khi Faker phải rời ghế thi đấu để điều trị chấn thương tay phải, T1 thua liền bảy trên tám trận — phơi bày sự mong manh đến tột cùng khi thiếu người chỉ huy. Khi trở lại, họ lột xác thành cơn bão càn quét toàn bộ hạt giống mạnh nhất để đăng quang ngay tại Seoul.",
      "Một năm sau tại London 2024, đối mặt với bờ vực thua 1–2 trước BLG, Faker bước ra với Sylas và Galio trong hai ván sinh tử, mang về ngôi sao thứ năm. Không ai trong hội trường O2 Arena đêm ấy biết rằng, đó là lần cuối cùng năm cái tên ZOFGK cùng nhau đứng dưới ánh hào quang Worlds.",
    ],
    tearsOrTriumph: "RESURRECTION",
  },
  {
    id: "act-4",
    roman: "IV",
    years: "2025",
    eraLabel: "VẾT CẮT ĐẦU TIÊN & KỲ TÍCH THÀNH ĐÔ",
    title: "Tháng Mười Một Đẫm Lệ & Ngôi Sao Thứ Sáu Lịch Sử",
    subtitle: "Zeus Rời Đi · Doran Gia Nhập · Three-Peat Thành Đô (09.11.2025)",
    primaryImage: "/images/t1/faker-2025-worlds.jpg",
    primaryCaption:
      "Faker sau trận Chung kết Worlds 2025 tại Thành Đô — nơi T1 hoàn tất cú Three-Peat vô tiền khoáng hậu.",
    secondaryImage: "/images/t1/zeus-2024.jpg",
    secondaryCaption:
      "Zeus khép lại chương ZOFGK vào cuối 2024 để mở ra hành trình mới tại HLE.",
    quote:
      "Trong giây phút người em út rời đi và cả thế giới hoài nghi đội hình mới, Faker ký vào bản hợp đồng ở lại đến năm 2029.",
    paragraphs: [
      "Mùa chuyển nhượng cuối năm 2024 giáng xuống một nhát cắt lạnh lẽo: Zeus rời T1 gia nhập Hanwha Life Esports. ZOFGK — đội hình được yêu thương nhất lịch sử esports — tan vỡ ngay trên đỉnh vinh quang. Giữa áp lực khổng lồ, Doran đặt bước chân đầu tiên vào phòng thay đồ T1.",
      "Vượt qua bao trận thua cay đắng ở giải quốc nội, tháng 11 năm 2025 tại Thành Đô, đối mặt KT Rolster trong trận Chung kết Đại Chiến Viễn Thông đầy nước mắt, T1 bị dẫn 1–2 rồi lại lội ngược dòng 3–2. Ngôi sao thứ sáu tỏa sáng — kỳ tích Three-Peat đầu tiên và duy nhất trong lịch sử LMHT ra đời.",
    ],
    tearsOrTriumph: "TRIUMPH",
  },
  {
    id: "act-5",
    roman: "V",
    years: "2026",
    eraLabel: "KHÚC TRÁNG CA BI TRÁNG NHẤT 2026",
    title: "Những Người Ở Lại Giữa Hoàng Hôn Đỏ",
    subtitle: "Cuộc Chia Ly Với Gumayusi · Đội Hình Doran–Oner–Faker–Peyz–Keria · Bán Kết Worlds 2026",
    primaryImage: "/images/t1/faker-2026.png",
    primaryCaption:
      "Lee Sang-hyeok năm 2026 — ánh mắt điềm tĩnh của người đã đi qua mười bốn mùa thanh xuân.",
    secondaryImage: "/images/t1/doran-lck.jpg",
    secondaryCaption:
      "Doran — người gánh chịu mọi so sánh khắc nghiệt để sát cánh cùng T1 qua mùa 2025 và 2026.",
    quote:
      "Bi tráng không nằm ở chỗ chiến thắng mãi mãi. Bi tráng là khi đồng đội cũ đứng bên kia chiến tuyến, bạn vẫn bước ra sàn đấu với trái tim nguyên vẹn.",
    paragraphs: [
      "Nếu sự ra đi của Zeus là cú sốc đầu tiên, thì mùa giải 2026 chứng kiến vết cắt đau đớn tiếp theo: Gumayusi chia tay T1 để hội ngộ Zeus dưới màu áo HLE. Năm người từng khóc cùng nhau ở San Francisco, từng ôm nhau ở Seoul và London, nay chỉ còn lại Faker, Oner và Keria.",
      "Cùng Doran và xạ thủ trẻ Peyz, T1 bước vào năm 2026 với vết sẹo chằng chịt và ánh nhìn soi xét của cả thế giới. Họ chiến đấu qua từng loạt Bo5 nghẹt thở — kể cả những cuộc đối đầu đẫm cảm xúc với những người em cũ — để tiến thẳng tới Bán kết Worlds 2026 trước khi dừng chân 3–4 trước BLG. Không chiếc cúp thứ bảy, nhưng mùa thu 2026 trở thành khúc tráng ca bi tráng nhất trong toàn bộ biên niên sử T1.",
    ],
    tearsOrTriumph: "REQUIEM",
  },
];

export const BROTHERHOOD_PLATES: BrotherhoodPlate[] = [
  {
    id: "p-faker",
    ign: "Faker",
    fullName: "Lee Sang-hyeok",
    role: "ĐƯỜNG GIỮA · ĐỘI TRƯỞNG",
    era: "2013 — 2029",
    statusTag: "NGƯỜI GÁC ĐỀN BẤT TỬ",
    image: "/images/t1/faker-2026.png",
    objectPosition: "50% 18%",
    quote:
      "Tôi không chơi để chứng minh người khác sai. Tôi chơi vì vẫn còn những người muốn thấy T1 bước tiếp.",
    story:
      "Sáu chiếc cúp Worlds, mười bốn năm không đổi màu áo. Từ cậu thiếu niên 17 tuổi đến người anh cả tuổi 30 ký hợp đồng đến năm 2029, anh đã tiễn biết bao thế hệ đồng đội đi qua đời mình và vẫn đứng đó giữ ngọn lửa đỏ.",
  },
  {
    id: "p-oner",
    ign: "Oner",
    fullName: "Mun Hyeon-jun",
    role: "ĐI RỪNG",
    era: "2021 — 2028",
    statusTag: "TRỤ CỘT Ở LẠI",
    image: "/images/t1/oner-worlds.jpg",
    objectPosition: "50% 22%",
    quote: "Chỉ cần anh Sang-hyeok còn nhìn về phía trước, tôi sẽ là người mở đường.",
    story:
      "Cùng Faker đi qua ba chức vô địch liên tiếp (2023, 2024, 2025) và gia hạn đến 2028. Trong những thời khắc cô đơn nhất của mùa giải 2026, Oner vẫn là lưỡi giáo tiên phong không biết mệt mỏi.",
  },
  {
    id: "p-keria",
    ign: "Keria",
    fullName: "Ryu Min-seok",
    role: "HỖ TRỢ",
    era: "2021 — HIỆN TẠI",
    statusTag: "LINH HỒN CHIẾN THUẬT",
    image: "/images/t1/keria-2023.jpg",
    objectPosition: "50% 22%",
    quote: "Giọt nước mắt ở San Francisco dạy tôi rằng: muốn bảo vệ nụ cười, phải mạnh hơn cả nỗi đau.",
    story:
      "Từ chàng trai gục khóc nức nở năm 2022 đến bậc thầy hỗ trợ ba lần vô địch thế giới. Năm 2026, khi người bạn đánh cặp thân thiết Gumayusi rời đi, Keria nén nỗi hụt hẫng để dìu dắt Peyz bước vào đấu trường lớn nhất hành tinh.",
  },
  {
    id: "p-gumayusi",
    ign: "Gumayusi",
    fullName: "Lee Min-hyeong",
    role: "XẠ THỦ (ZOFGK & 2025)",
    era: "2020 — 2025 (ĐẾN HLE 2026)",
    statusTag: "LỜI CHIA TAY ĐẦY NƯỚC MẮT",
    image: "/images/t1/gumayusi-2023.jpg",
    objectPosition: "50% 20%",
    quote: "Dòng máu T1 đã chảy trong tôi suốt năm năm thanh xuân đẹp nhất.",
    story:
      "Người xạ thủ kiên cường nhất từng đứng cạnh Keria, chủ nhân của những pha cướp Baron không tưởng và ba lần đăng quang 2023–2025. Cuộc chia tay sang HLE đầu mùa 2026 đã lấy đi nước mắt của cả cộng đồng T1.",
  },
  {
    id: "p-zeus",
    ign: "Zeus",
    fullName: "Choi Woo-je",
    role: "ĐƯỜNG TRÊN (ZOFGK)",
    era: "2021 — 2024 (ĐẾN HLE 2025)",
    statusTag: "MẢNH GHÉP ĐẦU TIÊN RỜI ĐI",
    image: "/images/t1/zeus-2024.jpg",
    objectPosition: "50% 20%",
    quote: "Cảm ơn vì đã cho em trưởng thành dưới ánh sáng của năm ngôi sao.",
    story:
      "MVP Chung kết Worlds 2023 và người em út của ZOFGK. Sự ra đi vào tháng 11/2024 mở ra chương mới đầy chông gai nhưng cũng chứng minh tình anh em vẫn mãi in sâu trong ký ức 2023–2024.",
  },
  {
    id: "p-doran",
    ign: "Doran & Peyz",
    fullName: "Choi Hyeon-joon · Kim Su-hwan",
    role: "THẾ HỆ DŨNG CẢM (2025–2026)",
    era: "2025 — 2026",
    statusTag: "NHỮNG KẺ KẾ THỪA GIỮA BÃO TÁP",
    image: "/images/t1/doran-lck.jpg",
    objectPosition: "50% 22%",
    quote: "Không ai bước vào chiếc áo T1 mà không run sợ — nhưng chúng tôi chọn đứng vững.",
    story:
      "Doran cùng Faker–Oner–Gumayusi–Keria tạo nên kỳ tích Three-Peat 2025 tại Thành Đô; rồi sang năm 2026, anh cùng Peyz chia sẻ gánh nặng mới, đưa T1 tiến đến Bán kết Worlds 2026 trong sự kính phục của toàn thế giới.",
  },
];
