/**
 * Central registry for hosted artwork (Cloudinary). Add a new entry here and
 * reference it by key wherever the image is needed — the same asset is reused
 * across sections, and the host is allow-listed in `next.config.ts` under
 * `images.remotePatterns`.
 */
const CLOUDINARY = "https://res.cloudinary.com/dh4blkvix/image/upload";

export type ImageAsset = {
  src: string;
  /** Used when the image carries meaning on its own; pass alt="" where a nearby heading already names it. */
  alt: string;
  width: number;
  height: number;
};

export const assets = {
  /**
   * `e_trim` strips the transparent padding baked into the source (the crest is
   * 719x1025 inside a 1254 square), so the mark can be sized by its own aspect
   * ratio instead of being floated in dead space.
   */
  logo: {
    src: `${CLOUDINARY}/e_trim/v1784842916/ajsmc/assets/grj5f0tqi2rb4dvlbq7j.png`,
    alt: "AJ Subaitha Medical Centre crest",
    width: 719,
    height: 1025,
  },
  aboutHeroBg: {
    src: `${CLOUDINARY}/v1784917585/ajsmc/assets/oswmgilitz1xzotprv3f.png`,
    alt: "Soft blue and green medical background",
    width: 1672,
    height: 941,
  },
  aboutHeroDecor: {
    src: `${CLOUDINARY}/v1784912279/ajsmc/assets/tv4criprnqpurlle8exw.png`,
    alt: "Bottle of medicine with capsules and tablets",
    width: 1254,
    height: 1254,
  },
  doctorsHeroDecor: {
    src: `${CLOUDINARY}/v1784912139/ajsmc/assets/s2bufxg52b4cfh1vfp1m.png`,
    alt: "Blue and green stethoscope",
    width: 1254,
    height: 1254,
  },
  contactHeroDecor: {
    // e_trim strips the wide transparent padding so the pin fills its box.
    src: `${CLOUDINARY}/e_trim/v1784927465/ajsmc/assets/lo409kymv6ev5blnopi5.png`,
    alt: "Blue and green location pin",
    width: 472,
    height: 623,
  },
  specialtiesHeroDecor: {
    src: `${CLOUDINARY}/v1784925716/ajsmc/assets/lhwr7mwtdplbukvvuh2n.png`,
    alt: "Blue and green sparkle",
    width: 1254,
    height: 1254,
  },
  statsBg: {
    src: `${CLOUDINARY}/v1784925859/ajsmc/assets/bdkfzj9wwbu1hhdyrvaz.png`,
    alt: "Blue and green streaked background",
    width: 1672,
    height: 941,
  },
  reachBg: {
    src: `${CLOUDINARY}/v1784926479/ajsmc/assets/kyntaxcghsl6e7sdstuo.png`,
    alt: "Blue and green swirl background",
    width: 941,
    height: 1672,
  },
  heroBackground: {
    src: `${CLOUDINARY}/v1784842621/ajsmc/assets/uqmqdb87uwza0wz3yj6j.png`,
    alt: "DNA double helix against a blue and green background",
    width: 1672,
    height: 941,
  },
  // Portrait crop of the same artwork — fills the tall mobile hero without the
  // heavy side-cropping the landscape version needs.
  heroBackgroundMobile: {
    src: `${CLOUDINARY}/v1784916309/ajsmc/assets/ltrnu8hh89ka2i9ovtcy.png`,
    alt: "DNA double helix against a blue and green background",
    width: 1086,
    height: 1448,
  },
  ecgTest: {
    src: `${CLOUDINARY}/v1784839289/ajsmc/assets/h4choh5gfec1oqo7fqhq.png`,
    alt: "Glass heart with an ECG waveform running through it",
    width: 1254,
    height: 1254,
  },
  lungsHealth: {
    src: `${CLOUDINARY}/v1784842045/ajsmc/assets/nj91in8ehdke8n3frtou.png`,
    alt: "Glass lungs rendered in blue and green",
    width: 1254,
    height: 1254,
  },
  reception: {
    src: `${CLOUDINARY}/v1784901477/ajsmc/assets/lsfasfxf9wbnqruvddgi.jpg`,
    alt: "AJSMC reception and lobby",
    width: 1600,
    height: 1015,
  },
  opdArea: {
    src: `${CLOUDINARY}/v1784901482/ajsmc/assets/oelw2chbfe3mqjhuha19.jpg`,
    alt: "AJSMC OPD consultation waiting area",
    width: 4096,
    height: 2304,
  },
  consultRoom: {
    src: `${CLOUDINARY}/v1784901482/ajsmc/assets/az2lqvv66oypsizsrqsb.jpg`,
    alt: "AJSMC consultation room with examination table",
    width: 4096,
    height: 2304,
  },
  usgEcgRoom: {
    src: `${CLOUDINARY}/v1784901491/ajsmc/assets/ssg8q1whc00tmhuigc88.jpg`,
    alt: "AJSMC USG and ECG room",
    width: 1600,
    height: 667,
  },
  xrayRoom: {
    src: `${CLOUDINARY}/v1784901489/ajsmc/assets/vsxnk4hmbs3l3ni8r0ay.jpg`,
    alt: "AJSMC X-ray room",
    width: 4096,
    height: 2304,
  },
  privateRoom1: {
    src: `${CLOUDINARY}/v1784901488/ajsmc/assets/d5jnohyjfrjijpwogalz.jpg`,
    alt: "AJSMC private inpatient room with bed and TV",
    width: 2304,
    height: 4096,
  },
  privateRoom2: {
    src: `${CLOUDINARY}/v1784901495/ajsmc/assets/cxguoausfxxprpfefpw0.jpg`,
    alt: "AJSMC private inpatient ward with bed",
    width: 2304,
    height: 4096,
  },
  tmtRoom: {
    src: `${CLOUDINARY}/v1784901485/ajsmc/assets/qaijqklzqpjgo1joyzau.jpg`,
    alt: "AJSMC TMT treadmill stress-test room",
    width: 2304,
    height: 4096,
  },
  cardiologyLab: {
    src: `${CLOUDINARY}/v1784901486/ajsmc/assets/gnhklbluxfkiix2fqzuc.jpg`,
    alt: "AJSMC cardiology lab with treadmill and monitoring station",
    width: 4096,
    height: 2304,
  },
  hospitalBuilding: {
    src: `${CLOUDINARY}/v1784844534/ajsmc/assets/lzsrrudfdgabtphjbpcx.png`,
    alt: "AJ Subaitha Medical Centre building in Egmore, Chennai",
    width: 1122,
    height: 1402,
  },
  doctorPortrait: {
    // Background-free cutout — sits inside the hero's glass pill.
    src: `${CLOUDINARY}/v1784895754/ajsmc/assets/gwibzmi5ia4zwon7aauu.png`,
    alt: "AJSMC doctor in scrubs with a stethoscope",
    width: 1086,
    height: 1448,
  },
  brainHealth: {
    src: `${CLOUDINARY}/v1784841186/ajsmc/assets/dqgymtjzbsjuneo3yg9h.png`,
    alt: "Glass brain rendered in blue and green",
    width: 1254,
    height: 1254,
  },
  liverHealth: {
    src: `${CLOUDINARY}/v1784841055/ajsmc/assets/hgjezqossgtflpn6r2b9.png`,
    alt: "Glass liver rendered in blue and green",
    width: 1254,
    height: 1254,
  },
} as const satisfies Record<string, ImageAsset>;

export type AssetKey = keyof typeof assets;
