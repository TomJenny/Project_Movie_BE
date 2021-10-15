"use strict";
const { Group } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const group = await Group.findOne({
      where: {
        groupCode: "gp01",
      },
    });
    await queryInterface.bulkInsert("Movies", [
      {
        movieCode: 5031,
        movieName: "The Croods: New Age Section 2",
        movieAlias: "the-croods-new-age-section-2",
        trailer: "https://www.youtube.com/embed/Fp9pNPdNwjI",
        imageUrl:
          "http://movie0706.cybersoft.edu.vn/hinhanh/the-croods-new-age-section-2_gp01.gif",
        description:
          "Sinh tồn trong một thế giới tiền sử luôn rình rập hiểm nguy từ đủ loài quái thú hung dữ cho tới thảm họa ngày tận thế, Nhà Croods chưa từng một lần chùn bước. Nhưng giờ đây họ sẽ phải đối mặt với thử thách lớn nhất từ trước tới nay: chung sống với một gia đình khác. Để tìm kiếm một mái nhà an toàn hơn, Nhà Croods bắt đầu hành trình khám phá thế giới tiến tới những vùng đất xa xôi đầy tiềm năng. Một ngày nọ, họ tình cờ lạc vào một nơi yên bình có đầy đủ mọi tiện nghi hiện đại và biệt lập với tường vây bao quanh. Tưởng rằng mọi vấn đề trong cuộc sống sẽ được giải quyết thì Nhà Croods lại phải chấp nhận với sự thật rằng đã có một gia đình khác định cư ở đây đó chính là Nhà Bettermans.",
        groupId: group.id,
        openingDay: "2021-09-15T10:45:13.237",
        duration: 120,
        rate: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieCode: 5032,
        movieName: "The Royal Bride 1",
        movieAlias: "the-royal-bride-1",
        trailer: "https://www.youtube.com/embed/c7qrN43PLCA",
        imageUrl:
          "http://movie0706.cybersoft.edu.vn/hinhanh/the-royal-bride_gp01.jpg",
        description:
          "A woman's future mother-in-law hatches a scheme to find a more suitable match for her son. To be continue!!!",
        groupId: group.id,
        openingDay: "2021-09-08T00:00:00",
        duration: 120,
        rate: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieCode: 5044,
        movieName: "Birds of Prey",
        movieAlias: "birds-of-prey",
        trailer: "https://www.youtube.com/embed/kGM4uYZzfu0",
        imageUrl:
          "http://movie0706.cybersoft.edu.vn/hinhanh/birds-of-prey_gp01.jpg",
        description:
          "Birds of prey là một bộ phim siêu anh hùng năm 2020 của Mỹ. Đây là bộ phim thứ tám trong Vũ trụ Mở rộng DC do Cathy Yan đạo diễn, dựa trên kịch bản của Christina Hodson. To be continue!!",
        groupId: group.id,
        openingDay: "2021-09-14T12:25:31.887",
        duration: 120,
        rate: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieCode: 5104,
        movieName: "How To Train Your Dragon",
        movieAlias: "how-to-train-your-dragon",
        trailer: "https://www.youtube.com/embed/Fp9pNPdNwjI",
        imageUrl:
          "http://movie0706.cybersoft.edu.vn/hinhanh/how-to-train-your-dragon_gp01.jpg",
        description:
          "A hapless young Viking who aspires to hunt dragons becomes the unlikely friend of a young dragon himself, and learns there may be more to the creatures than he assumed.",
        groupId: group.id,
        openingDay: "2021-09-09T01:32:10.017",
        duration: 120,
        rate: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieCode: 5125,
        movieName: "Người Cần Quên Phải Nhớ",
        movieAlias: "nguoi-can-quen-phai-nho",
        trailer: "https://www.youtube.com/embed/RfLnQkiD3iQ",
        imageUrl:
          "http://movie0706.cybersoft.edu.vn/hinhanh/nguoi-can-quen-phai-nho_gp01.png",
        description:
          "Người Cần Quên Phải Nhớ xoay quanh Loan, một nữ phóng viên năng động và nhạy bén. Nghi ngờ cái chết đột ngột của cha mình, cô quyết tâm sử dụng kiến thức nghiệp vụ nhằm vén màn bí mật bằng mọi giá. Trên hành trình “phá án”, Loan đã vô ý khiến Bình, gã giang hồ tưởng ngầu mà dễ mến bị chấn thương rồi mất trí nhớ. Trải qua hàng loạt tình huống dở khóc dở cười, hai người họ dần nảy sinh tình cảm với nhau.",
        groupId: group.id,
        openingDay: "2021-09-08T15:55:45.85",
        duration: 120,
        rate: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieCode: 5163,
        movieName: "Thợ Săn Quái Vật ",
        movieAlias: "tho-san-quai-vat",
        trailer: "https://www.youtube.com/embed/puQyZsaTtqY",
        imageUrl:
          "http://movie0706.cybersoft.edu.vn/hinhanh/tho-san-quai-vat-monster-hunter_gp01.png",
        description:
          "Monster Hunter được chuyển thể từ series game nổi tiếng cùng tên của Capcom. Trong phim, đội trưởng Artemis của nữ diễn viên Milla Jovovich (Resident Evil) và đồng đội đã vô tình bước qua một cánh cửa bí ẩn dẫn tới thế giới khác. Tại đây, họ phải chiến đấu với nhiều loài quái vật khổng lồ trong hành trình trở về thế giới. Đồng hành với họ trong trận chiến là nhân vật “Thợ săn” của nam diễn viên Tony Jaa (Ong Bak). Monster Hunter hứa hẹn sẽ là bom tấn hành động với những màn săn quái vật khổng lồ hoành tráng nhất năm 2020.",
        groupId: group.id,
        openingDay: "2021-08-29T10:46:41.997",
        duration: 120,
        rate: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieCode: 5178,
        movieName: "Josée, Nàng Thơ Của Tôi",
        movieAlias: "josee-nang-tho-cua-toi",
        trailer: "https://www.youtube.com/embed/PqNGHKLyPD0",
        imageUrl:
          "http://movie0706.cybersoft.edu.vn/hinhanh/josee-nang-tho-cua-toi-josee_gp01.png",
        description:
          "Bộ phim là câu chuyện tình nên thơ của cậu sinh viên Young Seok (Nam Joo Hyuk) và Josée (Han Ji Min), một cô gái khuyết tật phải ngồi xe lăn vào mùa đông lạnh lẽo. Cuộc gặp gỡ đã khiến thế giới của Josée thay đổi.",
        groupId: group.id,
        openingDay: "2021-08-29T10:47:01.46",
        duration: 120,
        rate: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieCode: 5200,
        movieName: "Võ Sinh Đại Chiến New Version",
        movieAlias: "vo-sinh-dai-chien-new-version",
        trailer: "https://www.youtube.com/embed/mrNqbx4vUvA",
        imageUrl:
          "http://movie0706.cybersoft.edu.vn/hinhanh/vo-sinh-dai-chien_gp01.png",
        description:
          "Phim kể về “sự nghiệp” giải ngố của anh chàng Khoa từ Bình Định vào Sài Gòn nhập học. Thích võ thuật từ nhỏ, chân ướt chân ráo vào câu lạc bộ võ Ta của trường và phải lòng ngay “tiểu thư” danh giá của bao chàng theo đuổi.",
        groupId: group.id,
        openingDay: "2021-09-08T09:16:45.69",
        duration: 120,
        rate: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieCode: 5240,
        movieName: "Josée, Nàng Thơ Của Tôi",
        movieAlias: "josee-nang-tho-cua-toi",
        trailer: "https://www.youtube.com/embed/UMXATImg6e4",
        imageUrl:
          "http://movie0706.cybersoft.edu.vn/hinhanh/josee-nang-tho-cua-toi_gp01.gif",
        description:
          'Mắt biếc xoay quanh mối tình đơn phương của Ngạn với Hà Lan, cô bạn gái có cặp mắt hút hồn nhưng cá tính bướng bỉnh. Một chuyện tình nhiều cung bậc, từ ngộ nghĩnh trẻ con, rồi tình yêu thuở học trò trong sáng, trải qua bao biến cố, trở thành một cuộc "đuổi hình bắt bóng" buồn da diết nhưng không nguôi hi vọng.',
        groupId: group.id,
        openingDay: "2021-09-15T10:56:44.437",
        duration: 120,
        rate: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieCode: 5687,
        movieName: "Avengers: Endgame",
        movieAlias: "avengers-endgame",
        trailer: "https://www.youtube.com/embed/Fp9pNPdNwjI",
        imageUrl:
          "http://movie0706.cybersoft.edu.vn/hinhanh/avengers-endgame_gp01.jpg",
        description:
          "After Thanos, an intergalactic warlord, disintegrates half of the universe, the Avengers must reunite and assemble again to reinvigorate their trounced allies and restore balance.\n",
        groupId: group.id,
        openingDay: "2021-08-31T00:00:00",
        duration: 120,
        rate: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieCode: 5918,
        movieName: "Death Strandingg",
        movieAlias: "death-strandingg",
        trailer: "https://www.youtube.com/embed/tCI396HyhbQ",
        imageUrl:
          "http://movie0706.cybersoft.edu.vn/hinhanh/death-strandingg_gp01.jpg",
        description:
          "From legendary game creator Hideo Kojima comes an all-new, genre-defying experience. Sam Bridges must brave a world utterly transformed by the Death Stranding. Carrying the disconnected remnants of our future in his hands, he embarks on a journey to reconnect the shattered world one step at a time.",
        groupId: group.id,
        openingDay: "2021-06-25T00:00:00",
        duration: 120,
        rate: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieCode: 5930,
        movieName: "Iron Meow",
        movieAlias: "iron-meow",
        trailer: "https://www.youtube.com/embed/My9guChk6WU",
        imageUrl:
          "http://movie0706.cybersoft.edu.vn/hinhanh/iron-meow_gp01.jpg",
        description:
          "I am Iron maneeeeeeeeeI am Iron maneeeeeeeeeI am Iron maneeeeeeeeeI am Iron maneeeeeeeeeI am Iron maneeeeeeeeeI am Iron maneeeeeeeeeI am Iron maneeeeeeeee",
        groupId: group.id,
        openingDay: "2021-09-12T00:00:00",
        duration: 120,
        rate: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieCode: 5964,
        movieName: "Red dead redemtion 2",
        movieAlias: "red-dead-redemtion-2",
        trailer: "https://www.youtube.com/embed/gmA6MrX81z4",
        imageUrl:
          "http://movie0706.cybersoft.edu.vn/hinhanh/red-dead-redemtion-2_gp01.jpg",
        description:
          "Red Dead Redemption 2[a] là một trò chơi hành động-phiêu lưu thuộc chủ đề cao bồi viễn Tây với góc nhìn thứ nhất và thứ ba, được phát triển bởi Rockstar Studios và xuất bản bởi Rockstar Games, phát hành vào ngày 26 tháng 10 năm 2018 cho PlayStation 4 và Xbox One và dự kiến phát hành vào tháng 11 năm 2019 cho Google Stadia và Microsoft Windows. Là trò chơi thứ ba trong sêri Red Dead, tiền truyện (chi tiết xem hậu truyện) và là phần hai của Red Dead Redemption. Đặt bối cảnh hư cấu quay về năm 1899 tại miền viễn Tây Hoa Kỳ, câu chuyện xoay quanh về kẻ ngoài vòng pháp luật Arthur Morgan, một thành viên của băng đảng Van der Line với kẻ đứng đầu là Dutch. Cả băng cố gắng đối phó với sự suy tàn của miền Tây hoang dã và chống lại chính quyền, cùng nhiều đối thủ khác. Câu chuyện cũng theo sau John Marston, nhân vật chính đến từ Red Dead Redemption.",
        groupId: group.id,
        openingDay: "2018-01-01T00:00:00",
        duration: 120,
        rate: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieCode: 5967,
        movieName: "Bố già",
        movieAlias: "bo-gia",
        trailer: "https://www.youtube.com/embed/jluSu8Rw6YE",
        imageUrl: "http://movie0706.cybersoft.edu.vn/hinhanh/bo-gia_gp01.jpg",
        description: "nghe đồn phim hay lắm đi xem đi",
        groupId: group.id,
        openingDay: "2021-08-29T10:40:30.78",
        duration: 120,
        rate: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieCode: 5984,
        movieName: "Aquaman",
        movieAlias: "aquaman",
        trailer: "https://www.youtube.com/embed/zxvHV58lp6s",
        imageUrl: "http://movie0706.cybersoft.edu.vn/hinhanh/aquaman_gp01.jpg",
        description: "pokemon",
        groupId: group.id,
        openingDay: "2021-09-14T12:27:28.653",
        duration: 120,
        rate: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieCode: 6019,
        movieName: "Diệp Vấn 2",
        movieAlias: "diep-van-2",
        trailer: "https://www.youtube.com/embed/My9guChk6WU",
        imageUrl:
          "http://movie0706.cybersoft.edu.vn/hinhanh/palm-spring_gp01.jpg",
        description: "ni hao ma??",
        groupId: group.id,
        openingDay: "2021-08-29T10:58:38.06",
        duration: 120,
        rate: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieCode: 6023,
        movieName: "Justice Luege",
        movieAlias: "justice-luege",
        trailer: "https://www.youtube.com/embed/ZrdQSAX2kyw",
        imageUrl:
          "http://movie0706.cybersoft.edu.vn/hinhanh/justice-luege_gp01.jpg",
        description: "RestoreSnyderCut",
        groupId: group.id,
        openingDay: "2021-03-22T20:07:26.357",
        duration: 120,
        rate: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieCode: 6098,
        movieName: " Bố Giá Victor 3",
        movieAlias: "bo-gia-victor-3",
        trailer: "https://www.youtube.com/embed/WCCp0zbnR50",
        imageUrl:
          "http://movie0706.cybersoft.edu.vn/hinhanh/bo-gia-victor-3_gp01.jpg",
        description:
          "Phim sẽ xoay quanh lối sống thường nhật của một xóm lao động nghèo, ở đó có bộ tứ anh em Giàu - Sang - Phú - Quý với Ba Sang sẽ là nhân vật chính, hay lo chuyện bao đồng nhưng vô cùng thương con cái. Câu chuyện phim tập trung về hai cha con Ba Sang (Trấn Thành) và Quắn (Tuấn Trần). Dù yêu thương nhau nhưng khoảng cách thế hệ đã đem đến những bất đồng lớn giữa hai cha con. Liệu cả hai có thể cho nhau cơ hội thấu hiểu đối phương, thu hẹp khoảng cách và tạo nên hạnh phúc từ sự khác biệt?",
        groupId: group.id,
        openingDay: "2021-07-20T15:09:09.39",
        duration: 120,
        rate: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieCode: 6117,
        movieName: "Đảo Hải Tặc",
        movieAlias: "dao-hai-tac",
        trailer: "https://www.youtube.com/embed/My9guChk6WU",
        imageUrl:
          "http://movie0706.cybersoft.edu.vn/hinhanh/dao-hai-tac_gp01.jpg",
        description:
          "What's Wrong with Secretary Kim? is a 2018 South Korean television series starring Park Seo-joon and Park Min-young. It is based on the novel of the same title by Jung Kyung-yoon which was first published in 2013, which was then serialized into a comic in 2015 via KakaoPage. The series aired on tvN from June 6 to July 26, 2018, on Wednesdays and Thursdays for 16 episodes.",
        groupId: group.id,
        openingDay: "2021-08-29T00:00:00",
        duration: 120,
        rate: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieCode: 6644,
        movieName: "Hurricanger",
        movieAlias: "hurricanger",
        trailer: "https://www.youtube.com/embed/UHQSbQIIJYA",
        imageUrl:
          "http://movie0706.cybersoft.edu.vn/hinhanh/hurricanger_gp01.jpg",
        description:
          "NINPUU SENTAI HURRICANEGER – CHIẾN ĐỘI NHẪN PHONG HURRICANEGER",
        groupId: group.id,
        openingDay: "2021-07-29T09:19:48.42",
        duration: 120,
        rate: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieCode: 7334,
        movieName: "Black Widow phần 3",
        movieAlias: "black-widow-phan-3",
        trailer: "https://www.youtube.com/watch?v=Fp9pNPdNwjI&t=9s",
        imageUrl:
          "http://movie0706.cybersoft.edu.vn/hinhanh/black-widow-phan-3_gp01.jpg",
        description:
          "Điểm bất ngờ chỉ đến khi cú twist giữa phim xuất hiện khiến cho câu chuyện đột nhiên trở nên thú vị, gây thích thú cho khán giả. Đến đây, phim sẽ khá tương đồng với mạch phim của Spider-Man: Homecoming, nhưng khá khó hiểu Sony lại chọn một cách kết phim khá tầm thường so với phần còn lại đầy “ bốc lửa ”của bộ phim. Cách kết phá đi tính cao trào giống như Captain Marvel vô tình tạo một sự hụt hẫng trong cảm xúc của người xem và không rõ đây có phải là ý đồ của Sony nhằm tạo ra những điểm gợn, sự tò mò cho khán giả hay không",
        groupId: group.id,
        openingDay: "2021-07-30T00:00:00",
        duration: 120,
        rate: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieCode: 7821,
        movieName: "Blue Eyes White Dragon",
        movieAlias: "blue-eyes-white-dragon",
        trailer: "https://www.youtube.com/embed/y8ne_qPSf_8",
        imageUrl:
          "http://movie0706.cybersoft.edu.vn/hinhanh/blue-eyes-white-dragon_gp01.jpg",
        description:
          "Mắt biếc xoay quanh mối tình đơn phương của Ngạn với Hà Lan, cô bạn gái có cặp mắt hút hồn nhưng cá tính bướng bỉnh. Một chuyện tình nhiều cung bậc, từ ngộ nghĩnh trẻ con, rồi tình yêu thuở học trò trong sáng, trải qua bao biến cố, trở thành một cuộc “đuổi hình bắt bóng” buồn da diết nhưng không nguôi hi vọng",
        groupId: group.id,
        openingDay: "2021-09-14T12:29:08.183",
        duration: 120,
        rate: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieCode: 7822,
        movieName: "Wonder Woman 2",
        movieAlias: "wonder-woman-2",
        trailer: "https://www.youtube.com/embed/QZblQLhKcZQ",
        imageUrl:
          "http://movie0706.cybersoft.edu.vn/hinhanh/wonder-woman-2_gp01.jpg",
        description:
          'Gretel & Hansel là một bộ phim kinh dị giả tưởng đen tối năm 2020 dựa trên câu chuyện dân gian Đức "Hansel và Gretel" của Anh em nhà Grimm. Phim do Oz Perkins đạo diễn, Fred Berger, Brian Kavanaugh-Jones và Dan Kagan sản xuất, với kịch bản của Rob Hayes.',
        groupId: group.id,
        openingDay: "2021-08-23T00:00:00",
        duration: 120,
        rate: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieCode: 7831,
        movieName: "Tần Số Chết",
        movieAlias: "tan-so-chet",
        trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
        imageUrl:
          "http://movie0706.cybersoft.edu.vn/hinhanh/tan-so-chet_gp01.jpeg",
        description:
          "Hố đen tử thần[4] (tựa gốc tiếng Anh: Interstellar) là một bộ phim khoa học viễn tưởng năm 2014 của đạo diễn Christopher Nolan. Với dàn diễn viên gồm Matthew McConaughey, Anne Hathaway, Jessica Chastain, Bill Irwin, Ellen Burstyn và Michael Caine, bộ phim kể về một nhóm nhà du hành vũ trụ đi xuyên qua hố đen. Nolan đã phát triển kịch bản phim dựa trên những ý tưởng mới của mình hòa trộn với kịch bản trước đó do người em trai Jonathan Nolan viết năm 2007 cho Paramount Pictures và nhà sản xuất Lynda Obst. Bộ phim được sản xuất bởi Nolan, Emma Thomas và Lynda Obst.",
        groupId: group.id,
        openingDay: "2021-08-16T20:11:13.947",
        duration: 120,
        rate: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Movies", null, {});
  },
};
