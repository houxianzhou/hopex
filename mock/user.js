import { delay } from 'roadhog-api-doc'

const other = {
  "errCode": "0",
  "errStr": "success",
  "ret": "0"
}

export default delay({
  'Get /api/user': (req, res) => {
    res.send(
      {
        userInfo: {
          email: '2278095567@qq.com',
          userId: '56',
          userToken: "56",
        },

      }
    )
  },
  'Post /mock/api/v1.0/User/Login': (req, res) => {
    res.send(
      {
        data: {
          email: '2278095567@qq.com',
          userId: 'mockId',
          token: "mockToken",
        },
        ...other

      }
    )
  },
  'Get /mock/api/v1.0/Country': (req, res) => {
    res.send(
      {
        "data": [{ "code": "AF", "digitCode": "004", "name": "阿富汗(AF)", "id": 245 }, {
          "code": "AX",
          "digitCode": "248",
          "name": "奥兰群岛(AX)",
          "id": 246
        }, { "code": "AL", "digitCode": "008", "name": "阿尔巴尼亚(AL)", "id": 247 }, {
          "code": "DZ",
          "digitCode": "012",
          "name": "阿尔及利亚(DZ)",
          "id": 248
        }, { "code": "AS", "digitCode": "016", "name": "美属萨摩亚(AS)", "id": 249 }, {
          "code": "AD",
          "digitCode": "020",
          "name": "安道尔(AD)",
          "id": 250
        }, { "code": "AO", "digitCode": "024", "name": "安哥拉(AO)", "id": 251 }, {
          "code": "AI",
          "digitCode": "660",
          "name": "安圭拉(AI)",
          "id": 252
        }, { "code": "AQ", "digitCode": "010", "name": "南极洲(AQ)", "id": 253 }, {
          "code": "AG",
          "digitCode": "028",
          "name": "安提瓜和巴布达(AG)",
          "id": 254
        }, { "code": "AR", "digitCode": "032", "name": "阿根廷(AR)", "id": 255 }, {
          "code": "AM",
          "digitCode": "051",
          "name": "亚美尼亚(AM)",
          "id": 256
        }, { "code": "AW", "digitCode": "533", "name": "阿鲁巴(AW)", "id": 257 }, {
          "code": "AU",
          "digitCode": "036",
          "name": "澳大利亚(AU)",
          "id": 258
        }, { "code": "AT", "digitCode": "040", "name": "奥地利(AT)", "id": 259 }, {
          "code": "AZ",
          "digitCode": "031",
          "name": "阿塞拜疆(AZ)",
          "id": 260
        }, { "code": "BS", "digitCode": "044", "name": "巴哈马(BS)", "id": 261 }, {
          "code": "BH",
          "digitCode": "048",
          "name": "巴林(BH)",
          "id": 262
        }, { "code": "BD", "digitCode": "050", "name": "孟加拉国(BD)", "id": 263 }, {
          "code": "BB",
          "digitCode": "052",
          "name": "巴巴多斯(BB)",
          "id": 264
        }, { "code": "BY", "digitCode": "112", "name": "白俄罗斯(BY)", "id": 265 }, {
          "code": "BE",
          "digitCode": "056",
          "name": "比利时(BE)",
          "id": 266
        }, { "code": "BZ", "digitCode": "084", "name": "伯利兹(BZ)", "id": 267 }, {
          "code": "BJ",
          "digitCode": "204",
          "name": "贝宁(BJ)",
          "id": 268
        }, { "code": "BM", "digitCode": "060", "name": "百慕大(BM)", "id": 269 }, {
          "code": "BT",
          "digitCode": "064",
          "name": "不丹(BT)",
          "id": 270
        }, { "code": "BO", "digitCode": "068", "name": "玻利维亚(BO)", "id": 271 }, {
          "code": "BA",
          "digitCode": "070",
          "name": "波黑(BA)",
          "id": 272
        }, { "code": "BW", "digitCode": "072", "name": "博茨瓦纳(BW)", "id": 273 }, {
          "code": "BV",
          "digitCode": "074",
          "name": "布维岛(BV)",
          "id": 274
        }, { "code": "BR", "digitCode": "076", "name": "巴西(BR)", "id": 275 }, {
          "code": "IO",
          "digitCode": "086",
          "name": "英属印度洋领地(IO)",
          "id": 276
        }, { "code": "BN", "digitCode": "096", "name": "文莱(BN)", "id": 277 }, {
          "code": "BG",
          "digitCode": "100",
          "name": "保加利亚(BG)",
          "id": 278
        }, { "code": "BF", "digitCode": "854", "name": "布基纳法索(BF)", "id": 279 }, {
          "code": "BI",
          "digitCode": "108",
          "name": "布隆迪(BI)",
          "id": 280
        }, { "code": "KH", "digitCode": "116", "name": "柬埔寨(KH)", "id": 281 }, {
          "code": "CM",
          "digitCode": "120",
          "name": "喀麦隆(CM)",
          "id": 282
        }, { "code": "CA", "digitCode": "124", "name": "加拿大(CA)", "id": 283 }, {
          "code": "CV",
          "digitCode": "132",
          "name": "佛得角(CV)",
          "id": 284
        }, { "code": "KY", "digitCode": "136", "name": "开曼群岛(KY)", "id": 285 }, {
          "code": "CF",
          "digitCode": "140",
          "name": "中非(CF)",
          "id": 286
        }, { "code": "TD", "digitCode": "148", "name": "乍得(TD)", "id": 287 }, {
          "code": "CL",
          "digitCode": "152",
          "name": "智利(CL)",
          "id": 288
        }, { "code": "CN", "digitCode": "156", "name": "中国(CN)", "id": 289 }, {
          "code": "CX",
          "digitCode": "162",
          "name": "圣诞岛(CX)",
          "id": 290
        }, { "code": "CC", "digitCode": "166", "name": "科科斯（基林）群岛(CC)", "id": 291 }, {
          "code": "CO",
          "digitCode": "170",
          "name": "哥伦比亚(CO)",
          "id": 292
        }, { "code": "KM", "digitCode": "174", "name": "科摩罗(KM)", "id": 293 }, {
          "code": "CG",
          "digitCode": "178",
          "name": "刚果（布）(CG)",
          "id": 294
        }, { "code": "CD", "digitCode": "180", "name": "刚果（金）(CD)", "id": 295 }, {
          "code": "CK",
          "digitCode": "184",
          "name": "库克群岛(CK)",
          "id": 296
        }, { "code": "CR", "digitCode": "188", "name": "哥斯达黎加(CR)", "id": 297 }, {
          "code": "CI",
          "digitCode": "384",
          "name": "科特迪瓦(CI)",
          "id": 298
        }, { "code": "HR", "digitCode": "191", "name": "克罗地亚(HR)", "id": 299 }, {
          "code": "CU",
          "digitCode": "192",
          "name": "古巴(CU)",
          "id": 300
        }, { "code": "CY", "digitCode": "196", "name": "塞浦路斯(CY)", "id": 301 }, {
          "code": "CZ",
          "digitCode": "203",
          "name": "捷克(CZ)",
          "id": 302
        }, { "code": "DK", "digitCode": "208", "name": "丹麦(DK)", "id": 303 }, {
          "code": "DJ",
          "digitCode": "262",
          "name": "吉布提(DJ)",
          "id": 304
        }, { "code": "DM", "digitCode": "212", "name": "多米尼克(DM)", "id": 305 }, {
          "code": "DO",
          "digitCode": "214",
          "name": "多米尼加(DO)",
          "id": 306
        }, { "code": "EC", "digitCode": "218", "name": "厄瓜多尔(EC)", "id": 307 }, {
          "code": "EG",
          "digitCode": "818",
          "name": "埃及(EG)",
          "id": 308
        }, { "code": "SV", "digitCode": "222", "name": "萨尔瓦多(SV)", "id": 309 }, {
          "code": "GQ",
          "digitCode": "226",
          "name": "赤道几内亚(GQ)",
          "id": 310
        }, { "code": "ER", "digitCode": "232", "name": "厄立特里亚(ER)", "id": 311 }, {
          "code": "EE",
          "digitCode": "233",
          "name": "爱沙尼亚(EE)",
          "id": 312
        }, { "code": "ET", "digitCode": "231", "name": "埃塞俄比亚(ET)", "id": 313 }, {
          "code": "FK",
          "digitCode": "238",
          "name": "福克兰群岛（马尔维纳斯）(FK)",
          "id": 314
        }, { "code": "FO", "digitCode": "234", "name": "法罗群岛(FO)", "id": 315 }, {
          "code": "FJ",
          "digitCode": "242",
          "name": "斐济(FJ)",
          "id": 316
        }, { "code": "FI", "digitCode": "246", "name": "芬兰(FI)", "id": 317 }, {
          "code": "FR",
          "digitCode": "250",
          "name": "法国(FR)",
          "id": 318
        }, { "code": "GF", "digitCode": "254", "name": "法属圭亚那(GF)", "id": 319 }, {
          "code": "PF",
          "digitCode": "258",
          "name": "法属波利尼西亚(PF)",
          "id": 320
        }, { "code": "TF", "digitCode": "260", "name": "法属南部领地(TF)", "id": 321 }, {
          "code": "GA",
          "digitCode": "266",
          "name": "加蓬(GA)",
          "id": 322
        }, { "code": "GM", "digitCode": "270", "name": "冈比亚(GM)", "id": 323 }, {
          "code": "GE",
          "digitCode": "268",
          "name": "格鲁吉亚(GE)",
          "id": 324
        }, { "code": "DE", "digitCode": "276", "name": "德国(DE)", "id": 325 }, {
          "code": "GH",
          "digitCode": "288",
          "name": "加纳(GH)",
          "id": 326
        }, { "code": "GI", "digitCode": "292", "name": "直布罗陀(GI)", "id": 327 }, {
          "code": "GR",
          "digitCode": "300",
          "name": "希腊(GR)",
          "id": 328
        }, { "code": "GL", "digitCode": "304", "name": "格陵兰(GL)", "id": 329 }, {
          "code": "GD",
          "digitCode": "308",
          "name": "格林纳达(GD)",
          "id": 330
        }, { "code": "GP", "digitCode": "312", "name": "瓜德罗普(GP)", "id": 331 }, {
          "code": "GU",
          "digitCode": "316",
          "name": "关岛(GU)",
          "id": 332
        }, { "code": "GT", "digitCode": "320", "name": "危地马拉(GT)", "id": 333 }, {
          "code": "GG",
          "digitCode": "831",
          "name": "格恩西岛(GG)",
          "id": 334
        }, { "code": "GN", "digitCode": "324", "name": "几内亚(GN)", "id": 335 }, {
          "code": "GW",
          "digitCode": "624",
          "name": "几内亚比绍(GW)",
          "id": 336
        }, { "code": "GY", "digitCode": "328", "name": "圭亚那(GY)", "id": 337 }, {
          "code": "HT",
          "digitCode": "332",
          "name": "海地(HT)",
          "id": 338
        }, { "code": "HM", "digitCode": "334", "name": "赫德岛和麦克唐纳岛(HM)", "id": 339 }, {
          "code": "VA",
          "digitCode": "336",
          "name": "梵蒂冈(VA)",
          "id": 340
        }, { "code": "HN", "digitCode": "340", "name": "洪都拉斯(HN)", "id": 341 }, {
          "code": "HK",
          "digitCode": "344",
          "name": "香港(HK)",
          "id": 342
        }, { "code": "HU", "digitCode": "348", "name": "匈牙利(HU)", "id": 343 }, {
          "code": "IS",
          "digitCode": "352",
          "name": "冰岛(IS)",
          "id": 344
        }, { "code": "IN", "digitCode": "356", "name": "印度(IN)", "id": 345 }, {
          "code": "ID",
          "digitCode": "360",
          "name": "印度尼西亚(ID)",
          "id": 346
        }, { "code": "IR", "digitCode": "364", "name": "伊朗(IR)", "id": 347 }, {
          "code": "IQ",
          "digitCode": "368",
          "name": "伊拉克(IQ)",
          "id": 348
        }, { "code": "IE", "digitCode": "372", "name": "爱尔兰(IE)", "id": 349 }, {
          "code": "IM",
          "digitCode": "833",
          "name": "英国属地曼岛(IM)",
          "id": 350
        }, { "code": "IL", "digitCode": "376", "name": "以色列(IL)", "id": 351 }, {
          "code": "IT",
          "digitCode": "380",
          "name": "意大利(IT)",
          "id": 352
        }, { "code": "JM", "digitCode": "388", "name": "牙买加(JM)", "id": 353 }, {
          "code": "JP",
          "digitCode": "392",
          "name": "日本(JP)",
          "id": 354
        }, { "code": "JE", "digitCode": "832", "name": "泽西岛(JE)", "id": 355 }, {
          "code": "JO",
          "digitCode": "400",
          "name": "约旦(JO)",
          "id": 356
        }, { "code": "KZ", "digitCode": "398", "name": "哈萨克斯坦(KZ)", "id": 357 }, {
          "code": "KE",
          "digitCode": "404",
          "name": "肯尼亚(KE)",
          "id": 358
        }, { "code": "KI", "digitCode": "296", "name": "基里巴斯(KI)", "id": 359 }, {
          "code": "KP",
          "digitCode": "408",
          "name": "朝鲜(KP)",
          "id": 360
        }, { "code": "KR", "digitCode": "410", "name": "韩国(KR)", "id": 361 }, {
          "code": "KW",
          "digitCode": "414",
          "name": "科威特(KW)",
          "id": 362
        }, { "code": "KG", "digitCode": "417", "name": "吉尔吉斯斯坦(KG)", "id": 363 }, {
          "code": "LA",
          "digitCode": "418",
          "name": "老挝(LA)",
          "id": 364
        }, { "code": "LV", "digitCode": "428", "name": "拉脱维亚(LV)", "id": 365 }, {
          "code": "LB",
          "digitCode": "422",
          "name": "黎巴嫩(LB)",
          "id": 366
        }, { "code": "LS", "digitCode": "426", "name": "莱索托(LS)", "id": 367 }, {
          "code": "LR",
          "digitCode": "430",
          "name": "利比里亚(LR)",
          "id": 368
        }, { "code": "LY", "digitCode": "434", "name": "利比亚(LY)", "id": 369 }, {
          "code": "LI",
          "digitCode": "438",
          "name": "列支敦士登(LI)",
          "id": 370
        }, { "code": "LT", "digitCode": "440", "name": "立陶宛(LT)", "id": 371 }, {
          "code": "LU",
          "digitCode": "442",
          "name": "卢森堡(LU)",
          "id": 372
        }, { "code": "MO", "digitCode": "446", "name": "澳门(MO)", "id": 373 }, {
          "code": "MK",
          "digitCode": "807",
          "name": "前南马其顿(MK)",
          "id": 374
        }, { "code": "MG", "digitCode": "450", "name": "马达加斯加(MG)", "id": 375 }, {
          "code": "MW",
          "digitCode": "454",
          "name": "马拉维(MW)",
          "id": 376
        }, { "code": "MY", "digitCode": "458", "name": "马来西亚(MY)", "id": 377 }, {
          "code": "MV",
          "digitCode": "462",
          "name": "马尔代夫(MV)",
          "id": 378
        }, { "code": "ML", "digitCode": "466", "name": "马里(ML)", "id": 379 }, {
          "code": "MT",
          "digitCode": "470",
          "name": "马耳他(MT)",
          "id": 380
        }, { "code": "MH", "digitCode": "584", "name": "马绍尔群岛(MH)", "id": 381 }, {
          "code": "MQ",
          "digitCode": "474",
          "name": "马提尼克(MQ)",
          "id": 382
        }, { "code": "MR", "digitCode": "478", "name": "毛利塔尼亚(MR)", "id": 383 }, {
          "code": "MU",
          "digitCode": "480",
          "name": "毛里求斯(MU)",
          "id": 384
        }, { "code": "YT", "digitCode": "175", "name": "马约特(YT)", "id": 385 }, {
          "code": "MX",
          "digitCode": "484",
          "name": "墨西哥(MX)",
          "id": 386
        }, { "code": "FM", "digitCode": "583", "name": "密克罗尼西亚联邦(FM)", "id": 387 }, {
          "code": "MD",
          "digitCode": "498",
          "name": "摩尔多瓦(MD)",
          "id": 388
        }, { "code": "MC", "digitCode": "492", "name": "摩纳哥(MC)", "id": 389 }, {
          "code": "MN",
          "digitCode": "496",
          "name": "蒙古(MN)",
          "id": 390
        }, { "code": "ME", "digitCode": "499", "name": "黑山(ME)", "id": 391 }, {
          "code": "MS",
          "digitCode": "500",
          "name": "蒙特塞拉特(MS)",
          "id": 392
        }, { "code": "MA", "digitCode": "504", "name": "摩洛哥(MA)", "id": 393 }, {
          "code": "MZ",
          "digitCode": "508",
          "name": "莫桑比克(MZ)",
          "id": 394
        }, { "code": "MM", "digitCode": "104", "name": "缅甸(MM)", "id": 395 }, {
          "code": "NA",
          "digitCode": "516",
          "name": "纳米比亚(NA)",
          "id": 396
        }, { "code": "NR", "digitCode": "520", "name": "瑙鲁(NR)", "id": 397 }, {
          "code": "NP",
          "digitCode": "524",
          "name": "尼泊尔(NP)",
          "id": 398
        }, { "code": "NL", "digitCode": "528", "name": "荷兰(NL)", "id": 399 }, {
          "code": "AN",
          "digitCode": "530",
          "name": "荷属安的列斯(AN)",
          "id": 400
        }, { "code": "NC", "digitCode": "540", "name": "新喀里多尼亚(NC)", "id": 401 }, {
          "code": "NZ",
          "digitCode": "554",
          "name": "新西兰(NZ)",
          "id": 402
        }, { "code": "NI", "digitCode": "558", "name": "尼加拉瓜(NI)", "id": 403 }, {
          "code": "NE",
          "digitCode": "562",
          "name": "尼日尔(NE)",
          "id": 404
        }, { "code": "NG", "digitCode": "566", "name": "尼日利亚(NG)", "id": 405 }, {
          "code": "NU",
          "digitCode": "570",
          "name": "纽埃(NU)",
          "id": 406
        }, { "code": "NF", "digitCode": "574", "name": "诺福克岛(NF)", "id": 407 }, {
          "code": "MP",
          "digitCode": "580",
          "name": "北马里亚纳(MP)",
          "id": 408
        }, { "code": "NO", "digitCode": "578", "name": "挪威(NO)", "id": 409 }, {
          "code": "OM",
          "digitCode": "512",
          "name": "阿曼(OM)",
          "id": 410
        }, { "code": "PK", "digitCode": "586", "name": "巴基斯坦(PK)", "id": 411 }, {
          "code": "PW",
          "digitCode": "585",
          "name": "帕劳(PW)",
          "id": 412
        }, { "code": "PS", "digitCode": "275", "name": "巴勒斯坦(PS)", "id": 413 }, {
          "code": "PA",
          "digitCode": "591",
          "name": "巴拿马(PA)",
          "id": 414
        }, { "code": "PG", "digitCode": "598", "name": "巴布亚新几内亚(PG)", "id": 415 }, {
          "code": "PY",
          "digitCode": "600",
          "name": "巴拉圭(PY)",
          "id": 416
        }, { "code": "PE", "digitCode": "604", "name": "秘鲁(PE)", "id": 417 }, {
          "code": "PH",
          "digitCode": "608",
          "name": "菲律宾(PH)",
          "id": 418
        }, { "code": "PN", "digitCode": "612", "name": "皮特凯恩(PN)", "id": 419 }, {
          "code": "PL",
          "digitCode": "616",
          "name": "波兰(PL)",
          "id": 420
        }, { "code": "PT", "digitCode": "620", "name": "葡萄牙(PT)", "id": 421 }, {
          "code": "PR",
          "digitCode": "630",
          "name": "波多黎各(PR)",
          "id": 422
        }, { "code": "QA", "digitCode": "634", "name": "卡塔尔(QA)", "id": 423 }, {
          "code": "RE",
          "digitCode": "638",
          "name": "留尼汪(RE)",
          "id": 424
        }, { "code": "RO", "digitCode": "642", "name": "罗马尼亚(RO)", "id": 425 }, {
          "code": "RU",
          "digitCode": "643",
          "name": "俄罗斯联邦(RU)",
          "id": 426
        }, { "code": "RW", "digitCode": "646", "name": "卢旺达(RW)", "id": 427 }, {
          "code": "SH",
          "digitCode": "654",
          "name": "圣赫勒拿(SH)",
          "id": 428
        }, { "code": "KN", "digitCode": "659", "name": "圣基茨和尼维斯(KN)", "id": 429 }, {
          "code": "LC",
          "digitCode": "662",
          "name": "圣卢西亚(LC)",
          "id": 430
        }, { "code": "PM", "digitCode": "666", "name": "圣皮埃尔和密克隆(PM)", "id": 431 }, {
          "code": "VC",
          "digitCode": "670",
          "name": "圣文森特和格林纳丁斯(VC)",
          "id": 432
        }, { "code": "WS", "digitCode": "882", "name": "萨摩亚(WS)", "id": 433 }, {
          "code": "SM",
          "digitCode": "674",
          "name": "圣马力诺(SM)",
          "id": 434
        }, { "code": "ST", "digitCode": "678", "name": "圣多美和普林西比(ST)", "id": 435 }, {
          "code": "SA",
          "digitCode": "682",
          "name": "沙特阿拉伯(SA)",
          "id": 436
        }, { "code": "SN", "digitCode": "686", "name": "塞内加尔(SN)", "id": 437 }, {
          "code": "RS",
          "digitCode": "688",
          "name": "塞尔维亚(RS)",
          "id": 438
        }, { "code": "SC", "digitCode": "690", "name": "塞舌尔(SC)", "id": 439 }, {
          "code": "SL",
          "digitCode": "694",
          "name": "塞拉利昂(SL)",
          "id": 440
        }, { "code": "SG", "digitCode": "702", "name": "新加坡(SG)", "id": 441 }, {
          "code": "SK",
          "digitCode": "703",
          "name": "斯洛伐克(SK)",
          "id": 442
        }, { "code": "SI", "digitCode": "705", "name": "斯洛文尼亚(SI)", "id": 443 }, {
          "code": "SB",
          "digitCode": "090",
          "name": "所罗门群岛(SB)",
          "id": 444
        }, { "code": "SO", "digitCode": "706", "name": "索马里(SO)", "id": 445 }, {
          "code": "ZA",
          "digitCode": "710",
          "name": "南非(ZA)",
          "id": 446
        }, { "code": "GS", "digitCode": "239", "name": "南乔治亚岛和南桑德韦奇岛(GS)", "id": 447 }, {
          "code": "ES",
          "digitCode": "724",
          "name": "西班牙(ES)",
          "id": 448
        }, { "code": "LK", "digitCode": "144", "name": "斯里兰卡(LK)", "id": 449 }, {
          "code": "SD",
          "digitCode": "736",
          "name": "苏丹(SD)",
          "id": 450
        }, { "code": "SR", "digitCode": "740", "name": "苏里南(SR)", "id": 451 }, {
          "code": "SJ",
          "digitCode": "744",
          "name": "斯瓦尔巴岛和扬马延岛(SJ)",
          "id": 452
        }, { "code": "SZ", "digitCode": "748", "name": "斯威士兰(SZ)", "id": 453 }, {
          "code": "SE",
          "digitCode": "752",
          "name": "瑞典(SE)",
          "id": 454
        }, { "code": "CH", "digitCode": "756", "name": "瑞士(CH)", "id": 455 }, {
          "code": "SY",
          "digitCode": "760",
          "name": "叙利亚(SY)",
          "id": 456
        }, { "code": "TW", "digitCode": "158", "name": "台湾(TW)", "id": 457 }, {
          "code": "TJ",
          "digitCode": "762",
          "name": "塔吉克斯坦(TJ)",
          "id": 458
        }, { "code": "TZ", "digitCode": "834", "name": "坦桑尼亚(TZ)", "id": 459 }, {
          "code": "TH",
          "digitCode": "764",
          "name": "泰国(TH)",
          "id": 460
        }, { "code": "TL", "digitCode": "626", "name": "东帝汶(TL)", "id": 461 }, {
          "code": "TG",
          "digitCode": "768",
          "name": "多哥(TG)",
          "id": 462
        }, { "code": "TK", "digitCode": "772", "name": "托克劳(TK)", "id": 463 }, {
          "code": "TO",
          "digitCode": "776",
          "name": "汤加(TO)",
          "id": 464
        }, { "code": "TT", "digitCode": "780", "name": "特立尼达和多巴哥(TT)", "id": 465 }, {
          "code": "TN",
          "digitCode": "788",
          "name": "突尼斯(TN)",
          "id": 466
        }, { "code": "TR", "digitCode": "792", "name": "土耳其(TR)", "id": 467 }, {
          "code": "TM",
          "digitCode": "795",
          "name": "土库曼斯坦(TM)",
          "id": 468
        }, { "code": "TC", "digitCode": "796", "name": "特克斯和凯科斯群岛(TC)", "id": 469 }, {
          "code": "TV",
          "digitCode": "798",
          "name": "图瓦卢(TV)",
          "id": 470
        }, { "code": "UG", "digitCode": "800", "name": "乌干达(UG)", "id": 471 }, {
          "code": "UA",
          "digitCode": "804",
          "name": "乌克兰(UA)",
          "id": 472
        }, { "code": "AE", "digitCode": "784", "name": "阿联酋(AE)", "id": 473 }, {
          "code": "GB",
          "digitCode": "826",
          "name": "英国(GB)",
          "id": 474
        }, { "code": "US", "digitCode": "840", "name": "美国(US)", "id": 475 }, {
          "code": "UM",
          "digitCode": "581",
          "name": "美国本土外小岛屿(UM)",
          "id": 476
        }, { "code": "UY", "digitCode": "858", "name": "乌拉圭(UY)", "id": 477 }, {
          "code": "UZ",
          "digitCode": "860",
          "name": "乌兹别克斯坦(UZ)",
          "id": 478
        }, { "code": "VU", "digitCode": "548", "name": "瓦努阿图(VU)", "id": 479 }, {
          "code": "VE",
          "digitCode": "862",
          "name": "委内瑞拉(VE)",
          "id": 480
        }, { "code": "VN", "digitCode": "704", "name": "越南(VN)", "id": 481 }, {
          "code": "VG",
          "digitCode": "092",
          "name": "英属维尔京群岛(VG)",
          "id": 482
        }, { "code": "VI", "digitCode": "850", "name": "美属维尔京群岛(VI)", "id": 483 }, {
          "code": "WF",
          "digitCode": "876",
          "name": "瓦利斯和富图纳(WF)",
          "id": 484
        }, { "code": "EH", "digitCode": "732", "name": "西撒哈拉(EH)", "id": 485 }, {
          "code": "YE",
          "digitCode": "887",
          "name": "也门(YE)",
          "id": 486
        }, { "code": "ZM", "digitCode": "894", "name": "赞比亚(ZM)", "id": 487 }, {
          "code": "ZW",
          "digitCode": "716",
          "name": "津巴布韦(ZW)",
          "id": 488
        }], "ret": 0, "errCode": null, "errStr": null
      }
    )
  },
  'Post /mock/api/v1.0/User/Regist': (req, res) => {
    res.send(
      {
        data: '',
        ...other
      }
    )
  },
  'Get /mock/api/v1.0/User/RegistActive': (req, res) => {
    res.send(
      {
        data: '',
        ...other
      }
    )
  },
  'Get /mock/api/v1.0/User/EmailExists': (req, res) => {
    res.send(
      {
        data: true,
        ...other
      }
    )
  },
}, 300)
