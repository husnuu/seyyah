import type { Product } from "./vitrin";

/**
 * Çeşme Poseidon (cesmetekneturu.net) önizlemesi için içerik.
 *
 * DOĞRULANMIŞ (siteden, Ekim 2026): tur adları, süreler, kalkış noktaları,
 * fiyatlar, dahil olanların özeti, Eco sınıfı, 24 saat iade, hava garantisi,
 * 20+ tekne ve 28.000–110.000 ₺ günlük kiralama aralığı, adres, saatler, üyelikler.
 *
 * TASLAK (yayından önce işletme doğrulamalı): tur açıklamaları ve programların
 * saatleri (gün batımı hariç), Premium/First sınıfları, filo listesindeki
 * tekneler ve özellikleri, koy açıklamaları.
 *
 * Misafir yorumları ve puanlar bilerek alınmadı.
 */

export const BASE = "/onizleme/cesme-tekne-turu";

export const brand = {
  name: "Çeşme Poseidon",
  since: 1988,
  operator: "HANTAL Turizm",
  address: "Çeşme Yat Limanı, Çeşme / İzmir",
  hours: "Her gün 08:00 – 23:00",
  memberships: ["TÜRSAB", "İMEAK Deniz Ticaret Odası"],
  domain: "cesmetekneturu.net",
};

const common = {
  city: "cesme" as const,
  languages: ["Türkçe", "İngilizce"],
  instant: true,
  freeCancel: true,
  cancellation: "Tur saatinden 24 saat öncesine kadar ücretsiz iade. Hava koşulları nedeniyle iptal edilen turlarda tam iade ya da ücretsiz tarih değişikliği.",
  supplier: "Çeşme Poseidon",
};

export const tours: Product[] = [
  {
    ...common,
    slug: "adalar-ve-koylar-turu",
    title: "Adalar & Koylar Turu, öğle yemeği dahil",
    category: "tekne",
    image: "/images/p/koy-yat.jpg",
    gallery: ["/images/p/koy-yat.jpg", "/images/p/koy-kus.jpg", "/images/p/izgara.jpg", "/images/p/koy-kayalik.jpg"],
    summary: "Akvaryum Koyu ve Eşek Adası dahil turkuaz koylarda yüzme molaları, teknede mangal öğle yemeği.",
    duration: "7 saat",
    badge: "Çok tercih edilen",
    options: [{ name: "Eco", tickets: [{ label: "Kişi", price: 1350 }] }],
    oldPrice: 1500,
    highlights: ["Çeşme'nin en berrak koylarında yüzme molaları", "Teknede taze mangal öğle yemeği", "Gölgelik güverte ve güneşlenme alanları"],
    description:
      "Çeşme Sahil'den kalkan Poseidon ile gün boyu adalar ve koylar arasında dolaşırsınız. Rota, havaya ve rüzgâra göre kaptanın kararıyla belirlenir; her durakta uzun yüzme molaları verilir. Öğle yemeği teknede mangalda hazırlanır. Akşamüstü Çeşme'ye dönüş yapılır.",
    included: ["Tekne turu", "Mangal öğle yemeği", "Yüzme molaları", "Kaptan ve mürettebat"],
    excluded: ["İçecekler", "Otel transferi"],
    meeting: "Çeşme Sahil, Poseidon iskelesi. Kalkıştan 20 dakika önce iskelede olunuz.",
    remember: ["Havlu, güneş kremi ve mayo getirin.", "Rota hava koşullarına göre değişebilir."],
    chips: ["Yüzme molası", "Mangal", "Aile dostu"],
    itinerary: [
      { time: "10:30", title: "Çeşme Sahil'den kalkış", body: "" },
      { time: "11:30", title: "Akvaryum Koyu", body: "İlk yüzme molası." },
      { time: "13:00", title: "Mangal öğle yemeği", body: "Teknede servis." },
      { time: "14:00", title: "Eşek Adası", body: "Uzun yüzme molası." },
      { time: "17:30", title: "Çeşme'ye dönüş", body: "" },
    ],
  },
  {
    ...common,
    slug: "izmir-cikisli-tam-gun-tur",
    title: "İzmir çıkışlı tam gün tekne turu",
    category: "tekne",
    image: "/images/p/yuzme.jpg",
    gallery: ["/images/p/yuzme.jpg", "/images/p/koy-yat.jpg", "/images/p/izgara.jpg"],
    summary: "İzmir'deki alınış noktalarından transferle Çeşme'ye; dört duraklı tekne turu ve mangal öğle yemeği.",
    duration: "10 saat",
    pickup: true,
    options: [{ name: "Eco + transfer", tickets: [{ label: "Kişi", price: 2400 }] }],
    highlights: ["İzmir'den gidiş-dönüş transfer", "Dört farklı durak", "Mangal öğle yemeği"],
    description:
      "Sabah İzmir'deki belirlenmiş alınış noktalarından servisle Çeşme'ye ulaşırsınız. Poseidon ile dört farklı koyda durulur; öğle yemeği teknede mangalda hazırlanır. Akşam aynı noktalara dönüş yapılır.",
    included: ["Gidiş-dönüş transfer", "Tekne turu", "Mangal öğle yemeği", "4 durak"],
    excluded: ["İçecekler"],
    meeting: "İzmir'deki alınış noktaları; nokta ve saat rezervasyondan sonra bildirilir.",
    remember: ["Alınış saatinden 10 dakika önce hazır olun."],
    chips: ["Transfer dahil", "Mangal", "Tam gün"],
    itinerary: [
      { time: "07:30", title: "İzmir'den alınış", body: "" },
      { time: "09:30", title: "Çeşme'de tekneye biniş", body: "" },
      { time: "10:30", title: "1. ve 2. durak", body: "Yüzme molaları." },
      { time: "13:00", title: "Mangal öğle yemeği", body: "" },
      { time: "14:00", title: "3. ve 4. durak", body: "" },
      { time: "17:30", title: "İzmir'e dönüş", body: "" },
    ],
  },
  {
    ...common,
    slug: "gun-batimi-turu",
    title: "Gün batımı turu, akşam yemeği dahil",
    category: "tekne",
    image: "/images/p/gunbatimi-yat.jpg",
    gallery: ["/images/p/gunbatimi-yat.jpg", "/images/p/gunbatimi.jpg", "/images/p/koy-kus.jpg"],
    summary: "Akvaryum Koyu'nda akşam yüzmesi, hafif müzik ve teknede akşam yemeğiyle gün batımı.",
    duration: "3 saat · 19:00–21:30",
    options: [{ name: "Eco", tickets: [{ label: "Kişi", price: 1500 }] }],
    highlights: ["Akvaryum Koyu'nda akşam yüzmesi", "Denizde gün batımı", "Hafif müzik ve akşam yemeği"],
    description:
      "Saat 19:00'da Çeşme Sahil'den ayrılan Poseidon, Akvaryum Koyu'nda kısa bir yüzme molası verir. Güneş batarken akşam yemeği servis edilir; hafif müzik eşliğinde 21:30'da limana dönülür.",
    included: ["Tekne turu", "Akşam yemeği", "Akvaryum Koyu'nda yüzme", "Hafif müzik"],
    excluded: ["İçecekler"],
    meeting: "Çeşme Sahil, Poseidon iskelesi. 18:40'ta iskelede olunuz.",
    remember: ["Akşam serinliği için ince bir üst getirin."],
    chips: ["Gün batımı", "Akşam yemeği", "Çiftler için"],
    itinerary: [
      { time: "19:00", title: "Çeşme Sahil'den kalkış", body: "" },
      { time: "19:30", title: "Akvaryum Koyu", body: "Akşam yüzmesi." },
      { time: "20:15", title: "Gün batımı ve akşam yemeği", body: "" },
      { time: "21:30", title: "Limana dönüş", body: "" },
    ],
  },
  {
    ...common,
    slug: "sualti-macerasi",
    title: "Sualtı macerası: dalış ve şnorkel",
    category: "tur",
    image: "/images/p/resif.jpg",
    gallery: ["/images/p/resif.jpg", "/images/p/yuzme-2.jpg", "/images/p/koy-kayalik.jpg"],
    summary: "Rehber eşliğinde dalış ve şnorkel; teknede öğle yemeği dahil tam gün.",
    duration: "Tam gün",
    badge: "Yeni",
    options: [{ name: "Dalış + şnorkel", tickets: [{ label: "Kişi", price: 4500 }] }],
    highlights: ["Rehberli tanışma dalışı", "Şnorkel ile sualtı yaşamı", "Teknede öğle yemeği"],
    description:
      "Deneyimli rehberler eşliğinde, daha önce dalış yapmamış misafirler için de uygun bir gün. Güvenlik bilgilendirmesinin ardından sığ ve berrak noktalarda dalış yapılır; diğer duraklarda şnorkel ve yüzme molaları verilir.",
    included: ["Rehberli dalış", "Dalış ve şnorkel ekipmanı", "Öğle yemeği", "Yüzme molaları"],
    excluded: ["Sualtı fotoğraf paketi", "İçecekler"],
    meeting: "Çeşme Sahil, Poseidon iskelesi.",
    remember: ["Sağlık durumunuzla ilgili bilgi formu doldurmanız istenir.", "Dalıştan sonraki 24 saat uçuş önerilmez."],
    chips: ["Dalış", "Şnorkel", "Macera"],
  },
];

export const tourMeta: Record<string, { departure: string; coves: string[] }> = {
  "adalar-ve-koylar-turu": { departure: "Çeşme Sahil", coves: ["Akvaryum Koyu", "Eşek Adası"] },
  "izmir-cikisli-tam-gun-tur": { departure: "İzmir alınış noktaları", coves: ["Akvaryum Koyu", "Eşek Adası"] },
  "gun-batimi-turu": { departure: "Çeşme Sahil", coves: ["Akvaryum Koyu"] },
  "sualti-macerasi": { departure: "Çeşme Sahil", coves: ["Mercan Adası"] },
};

export const classes = [
  { key: "eco", name: "Eco", lead: "Orta güvertede gölgelik alan.", features: ["Gölgelik orta güverte", "Gruplar için masa ya da şezlong", "1–2 kişilik güneşlenme minderi"], draft: false },
  { key: "premium", name: "Premium", lead: "Daha geniş, ayrılmış oturma alanı.", features: ["Ayrılmış oturma alanı", "Öncelikli biniş", "İkram içecek"], draft: true },
  { key: "first", name: "First", lead: "Teknenin en ayrıcalıklı bölümü.", features: ["Ön güvertede özel alan", "Kişisel servis", "Öncelikli biniş ve iniş"], draft: true },
] as const;

export const coves = [
  { slug: "akvaryum-koyu", name: "Akvaryum Koyu", body: "Adını berrak suyundan alan, şnorkel için ideal koy.", long: "Dibi metrelerce derinlikten görünen suyuyla Çeşme'nin en bilinen koylarından biri. Kayalık kıyılar boyunca küçük balık sürüleri şnorkelcilerin favorisi.", image: "/images/p/koy-kus.jpg", goodFor: ["Şnorkel", "Yüzme"] },
  { slug: "esek-adasi", name: "Eşek Adası", body: "Rüzgârdan korunaklı, sakin suları ve beyaz kumuyla.", long: "Adanın rüzgâr almayan tarafındaki sığ ve kumlu koy, çocuklu aileler için de rahat bir yüzme alanı sunar.", image: "/images/p/koy-kayalik.jpg", goodFor: ["Aileler", "Uzun mola"] },
  { slug: "mavi-koy", name: "Mavi Koy", body: "Turkuazın en koyu tonları; uzun bir yüzme molası için.", long: "Derin ve serin suları, öğleden sonra güneşinde bile ferahlatıcı bir yüzme imkânı verir.", image: "/images/p/yuzme-2.jpg", goodFor: ["Yüzme", "Fotoğraf"] },
  { slug: "mercan-adasi", name: "Mercan Adası", body: "Kayalık kıyıları ve sualtı yaşamıyla dalgıçların favorisi.", long: "Kayalık kıyıları ve zengin sualtı yaşamıyla dalış ve şnorkel rotalarının başlıca durağı.", image: "/images/p/resif.jpg", goodFor: ["Dalış", "Şnorkel"] },
  { slug: "kis-limani", name: "Kış Limanı", body: "Kuzey rüzgârında bile durgun kalan doğal liman.", long: "Rüzgârlı günlerde bile sakin kalan doğal bir sığınak; rotalar rüzgârlı havalarda sıklıkla buraya yönelir.", image: "/images/p/koy-sandal.jpg", goodFor: ["Rüzgârlı günler", "Sakin su"] },
];

export type Yacht = {
  slug: string;
  name: string;
  type: "Gulet" | "Motor yat" | "Yelkenli" | "Trawler";
  capacity: number;
  length: number;
  cabins: number;
  priceFrom: number;
  image: string;
  gallery: string[];
  summary: string;
  features: string[];
};

/** ÖRNEK FİLO — tekne adları ve özellikleri temsilidir; fiyatlar sitedeki 28.000–110.000 ₺ aralığındadır. */
export const yachts: Yacht[] = [
  { slug: "ornek-gulet-24", name: "Gulet · 24 m", type: "Gulet", capacity: 25, length: 24, cabins: 6, priceFrom: 65000, image: "/images/tekne.jpg", gallery: ["/images/tekne.jpg", "/images/p/koy-yat.jpg", "/images/p/izgara.jpg"], summary: "Geniş güvertesi ve gölgelik alanıyla kalabalık gruplar ve kutlamalar için.", features: ["Mangal", "Ses sistemi", "Gölgelik güverte", "Su oyuncakları"] },
  { slug: "ornek-motor-yat-18", name: "Motor yat · 18 m", type: "Motor yat", capacity: 12, length: 18, cabins: 3, priceFrom: 110000, image: "/images/yat.jpg", gallery: ["/images/yat.jpg", "/images/p/gunbatimi-yat.jpg", "/images/p/koy-kus.jpg"], summary: "Hızlı ve konforlu; koylar arasında daha fazla durak için.", features: ["Klima", "Flybridge", "Şnorkel ekipmanı", "Kaptan ve hostes"] },
  { slug: "ornek-yelkenli-14", name: "Yelkenli · 14 m", type: "Yelkenli", capacity: 8, length: 14, cabins: 3, priceFrom: 28000, image: "/images/p/yelkenli.jpg", gallery: ["/images/p/yelkenli.jpg", "/images/p/gunbatimi.jpg", "/images/p/koy-sandal.jpg"], summary: "Rüzgârla sessiz bir gün; çiftler ve küçük gruplar için.", features: ["Yelken deneyimi", "Güneşlenme minderi", "Şnorkel ekipmanı"] },
  { slug: "ornek-trawler-16", name: "Trawler · 16 m", type: "Trawler", capacity: 10, length: 16, cabins: 2, priceFrom: 45000, image: "/images/p/trawler.jpg", gallery: ["/images/p/trawler.jpg", "/images/p/koy-yat.jpg", "/images/p/yuzme.jpg"], summary: "Sakin seyir ve geniş iç salon; aileler için rahat bir seçenek.", features: ["Geniş salon", "Mutfak", "Gölgelik kıç güverte"] },
  { slug: "ornek-gulet-30", name: "Gulet · 30 m", type: "Gulet", capacity: 40, length: 30, cabins: 8, priceFrom: 95000, image: "/images/p/koy-yat.jpg", gallery: ["/images/p/koy-yat.jpg", "/images/tekne.jpg", "/images/p/koy-kayalik.jpg"], summary: "Şirket gezileri ve büyük davetler için filonun en geniş teknesi.", features: ["Catering", "DJ alanı", "İki güverte", "Su oyuncakları"] },
];

export const rentalModes = [
  { key: "saatlik", label: "Saatlik", body: "Kısa bir koy turu ya da gün batımı için." },
  { key: "gunluk", label: "Günlük", body: "Sabahtan akşama kendi rotanız." },
  { key: "konaklamali", label: "Konaklamalı", body: "Bir ya da birkaç gece denizde." },
];

export const faqGroups = [
  {
    title: "Turlar",
    items: [
      { q: "Tur kaçta, nereden kalkıyor?", a: "Gündüz turları Çeşme Sahil'den kalkar; gün batımı turu 19:00'da başlar. İzmir çıkışlı turda alınış noktaları rezervasyondan sonra bildirilir." },
      { q: "Teknede yemek var mı?", a: "Adalar & Koylar ve İzmir çıkışlı turlarda mangal öğle yemeği, gün batımı turunda akşam yemeği, sualtı macerasında öğle yemeği dahildir." },
      { q: "Bilet sınıfları arasındaki fark nedir?", a: "Eco sınıfı orta güvertede gölgelik alanda oturma sunar. Premium ve First sınıfları daha geniş ve ayrılmış alanlar sağlar." },
    ],
  },
  {
    title: "İptal ve hava durumu",
    items: [
      { q: "İptal edebilir miyim?", a: "Tur saatinden 24 saat öncesine kadar yapılan iptallerde ücret iadesi yapılır." },
      { q: "Hava kötü olursa ne olur?", a: "Hava koşulları nedeniyle tur yapılamazsa ücretinizin tamamı iade edilir ya da dilediğiniz başka bir güne aktarılır." },
    ],
  },
  {
    title: "Özel tekne",
    items: [
      { q: "Özel tekne kiralayabilir miyim?", a: "Evet. 20'den fazla teknemizle saatlik, günlük ya da konaklamalı kiralama seçenekleri sunuyoruz." },
    ],
  },
];

export const tlp = (n: number) => "₺" + n.toLocaleString("tr-TR");
