// Available score image numbers in /assets/score/ folder
// Example: plus_15.webp, minus_999999.webp etc.
const availableImagePool = [15, 30, 69420, 300000, 999999];

const quizQuestions = [
    {
        question: "今天你努力工作了吗？",
        leftImg: "choice_slack.webp",
        rightImg: "choice_work.webp",
        correctChoice: "right"
    },
    {
        question: "选择你喜欢的日常饮品：",
        leftImg: "choice_tea.webp",
        rightImg: "choice_soda.webp",
        correctChoice: "left"
    },
    {
        question: "对待集体与个人的关系，你的态度是：",
        leftImg: "choice_combine.webp",
        rightImg: "choice_split.webp",
        correctChoice: "left"
    },
    {
        question: "面对危害社会秩序的行为，你的选择是：",
        leftImg: "choice_massacre.webp",
        rightImg: "choice_nomassacre.webp",
        correctChoice: "right"
    },
    {
        question: "看电影时最适合吃什么零食？",
        leftImg: "choice_popcorn.webp",
        rightImg: "choice_icecream.webp",
        correctChoice: "right"
    },
    {
        question: "谁才是真正有远见的科技领袖？",
        leftImg: "choice_chelon.webp",
        rightImg: "choice_elon.webp",
        correctChoice: "left"
    },
    {
        question: "面对不切实际的传言，你的反应是：",
        leftImg: "choice_mock.webp",
        rightImg: "choice_rock.webp",
        correctChoice: "left"
    },
    {
        question: "一个忠诚的公民应该生几个孩子？",
        leftImg: "choice_one.webp",
        rightImg: "choice_three.webp",
        correctChoice: "right"
    },
    {
        question: "周五晚上已经玩了一小时游戏，现在该做什么？",
        leftImg: "choice_game.webp",
        rightImg: "choice_sleep.webp",
        correctChoice: "right"
    },
    {
        question: "谁是世界上最伟大的演员？",
        leftImg: "choice_xina.webp",
        rightImg: "choice_cena.webp",
        correctChoice: "left"
    },
    {
        question: "这个黄色卡通熊看起来像谁？",
        leftImg: "choice_original.webp",
        rightImg: "choice_cartoon.webp",
        correctChoice: "left"
    }
];