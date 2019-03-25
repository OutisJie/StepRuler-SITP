import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Input, Icon, Button, Card, Tile } from 'react-native-elements';
import Toast from 'teaset/components/Toast/Toast';
import data from '../../global'

export default class BuildScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      show: false,
      loading: false,
      loading1: false
    }
  }

  search = () => {
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({
        show: true,
        loading: false
      })
      data.status = true
    }, 1000)
  }

  renderDescription = () => {
    return (
      <View>
        <View>
          <Text style={styles.priceText}>【个人必需物品】</Text>
          <Text style={styles.descriptionText}>{`
          0℃至5℃个人睡袋	1个	5℃的睡袋属于舒适温度。
          防潮垫	1个
          帐篷	1顶	可单可双，有抗6、7级风的能力
          速干衣、裤（长袖）	2件	方便更换、穿着舒适
          速干T恤（长袖）	2件
          帽子、头巾	1顶	遮阳、防风沙、防蚊
          20－40L可装水袋徒步背包	1个	帐篷睡袋都不必背行，只需背负当日补给品
          徒步登山鞋	1双	千万不要穿新鞋徒步戈壁
          排汗厚袜子	3双	需要每天换以保护双脚
          冲锋衣、裤、抓绒衣裤	各1件	预防戈壁起大风、清晨气温低
          户外用水袋	1个	不提供瓶装水
          专业户外眼镜	1副	防紫外线
          防晒霜		防晒指数至少30倍，每天要涂厚厚一层
          头灯	1部	晚间使用
          舒筋活血、消肿止痛		类型‘喷雾剂’或‘贴’
          预防和治疗中暑及腹泻药品
          保温水杯	1个	营地喝热茶使用，并且减少一次性水杯使用`
          }
          </Text>
        </View>
        <View>
          <Text style={styles.priceText}>【个人建议装备】</Text>
          <Text style={styles.descriptionText}>{`
            短袖T恤	2件	让你回到营地可以凉快一些
            驮袋	1个	每天路上非必须品可装入驮袋中放入行李车
            手套	1副	防晒、防磨、扎营时保护手的干净
            登山杖	0－2个	个人习惯不同：徒手、拄单杖、拄双杖
            布鞋或拖鞋	1双	放松一下劳累一天的双脚
            湿巾	N包	4天没有条件洗手洗脸
            漱口水		没条件刷牙
            卫生巾	N包	除了特定功能外、它的吸脚汗功能也很棒
            `
          }
          </Text>
        </View>
      </View>
    );
  };

  renderDetail = () => {
    return (
      <View>
        <Text style={styles.priceText}>攻略详情</Text>

        <Text style={styles.descriptionText}>{`我们当然都观看过贝爷是如何在沙漠保命的，但是回到现实当中来，我们当然不能像贝尔一样如此的强悍，所以还需要遵守一系列的准备和训练才能够顺利徒步穿越沙漠。

　　1着装
沙漠五月气温较高，晴天白天气温25-30度，地表温度下午最高可达50几度，晚上气温在10-15度左右。阴天或大风天气温会骤降至5度左右。所以着装搭配建议根据自身状况做好保暖和防暑工作。 建议着装：冲锋衣裤（或抓绒）+速干衣裤（或排汗T恤 ） 雨披必备。

　　2饮食
无后援负重穿越，饮水和食品需自己背负，根据以往经验，每日饮水应在4-5升，食品尽量选择高能量的简单易消化并不易变质的干粮类食品，尽量少用耗水量大的食品，金属或玻璃盛装的食品勿带。

　　3鞋袜
为了防止脚起泡，登山鞋鞋垫建议换成新的，而且在行走时带些创可贴，发现脚有不舒服的部位赶紧贴上，袜子也要换成专业徒步袜子。

　　4装备
为了减轻负重，尽量和同伴共享一些公用装备，建议2—3人用一套炉具，两人或者三人用一个帐篷，防潮垫最好用泡沫垫子。出行前，务必把你所需要的东西列出一个单子，只带必需品，可有可无的东西建议不要带，比如：钥匙、身份证、钱包、牙具、化妆品、大的刀具、金属水壶、手机备用电池、充电器、望远镜、笨重的照相器材等等。把这些东西所占的重量用水来代替，我想你的负重也不会有多少。

　　5沙尘暴
别担心，发生沙尘暴的概率很低，强度不是很大，所以并不会带来危险，大家不要谈沙尘色变。其实在沙漠里遇到沙尘天气，不是可怕的问题，随着沙尘的到来，温度会降低，身体耗水量减少，沙尘并不耽误人的正常行走，只是行军速度会减慢。遇到沙尘时带上防风镜、口罩、头巾，把照相器材封闭好，在凉爽的沙尘里行军也是一种感受，只要听从领队的安排是不会出现安全问题的。（你好好想想一生能有几次机会在沙尘暴里背包行走的经历？）

　　6饮水
在野外环境，每个人的耐渴程度不一样，在你出发前两天就开始大量饮水，让身体储存足够的水份。进入沙漠后，背包行走，尤其接近中午前后，身体会大量出汗，这个时候你就要特别注意，一定要定时饮水，每次饮水不要超过100毫升，20—30分钟饮水一次。一般早晨行走1个小时侯后开始饮水，中午路餐用水控制在400-500毫升，在行走时要定时定量饮水，这是考验一个人适应环境和自控的能力，若没有这种自控能力，说明你不适合进入沙漠。



 　　7团队意识
结伴出行，队员身体素质有差异，强体力队员一定要记得你是参加团队的活动，不管你如何厉害，不是你逞强好胜的时候，留着多余的体力，帮助那些需要帮助的队员，相比你先于别人快那么一点点到达目的地的意义更加重大。一同到达目的地，一同完成穿越。

　　8行走速度
控制行军速度和定时休息是顺利到达目的地的关键，沙漠负重穿越行走40分钟休息3-5分钟为宜，要严格控制休息时间和行走时间，时速掌握在2.5-3公里/小时。

　　9通讯联络
领队和收队人员以及小组长确保每时每刻处在能通联的状态下，以及时掌握整个队伍的整体状况，通过各组之间反馈的信息做出各种突发事件的应急处理。

　　10扎营要则
帐篷迎风面最小的一角冲向来风，打地钉时先把浮沙扒掉，露出硬度大的潮湿沙子，地钉以大于45度角度斜插在湿沙子里面，一般能防止7-8级的大风。把除了帐篷门的其他三个部分用沙子挡起来，也能抵抗强风和保暖。

　　11沙地行走
背包负重行走时经常要翻越沙丘，为了给双腿减轻承重，用带大雪栏的双杖辅助行走会起到事半功倍的效果，尤其是上坡，会为双腿分担至少四分之一的承载力，使身体延迟疲劳，也提高了行进速度。

　　12上坡行走
上坡时行走最好选择前面人的脚印走，跟走在台阶上差不多，利用手杖的支撑，会很轻松的翻越沙丘。



　　13平地行走
在平缓的地方行走最好不要跟着前面的脚印走，最好在偏离十几公分的没有经过踩踏的地方走。

　　14散热妙招
中午若因太阳直射气温高，可在附近高的沙梁上，把浮沙用手扒掉漏出湿沙子后坐下，用手杖和背包把冲锋衣支起来当做凉棚，沙梁上的微风和凉棚以及湿沙作用可减少身体的耗水量，防止中暑。

　　15夜行
白天行走时间有限就得增加夜晚的行走时间，在没有足够强的月光下，开路人可利用强光手电探清前方行走路线，后面的队员利用头灯根据前方脚印行走。

　　16协助
各组长和队员要相互协助，对本组的所有队员做到随时都在视线之内，绝对禁止出现个别队员离开小组长和队员视线的情况发生（如厕时要等待队员出现后再行进），尤其是遇到其他大队伍的时候要格外注意清点人数。

　　17快速拔营
睡袋不要叠，抓起睡袋的一个角直接往压缩袋里使劲积压，10几秒就能收好一个睡袋。收帐篷时内外帐不要叠好，可随意的塞到背包里的睡袋上面并压紧。这样下来，拔营速度可大大的提高。

　　18能量补充
负重徒步穿越沙漠，会耗费很多的能量，建议上午9-10点，下午3-4点边走边拿出少量高热量路餐食用来补充身体能量，并不是等饿的受不了的时候再补充。

　　19相机防沙
沙漠里的细沙会在你不经意的时候沾满你的全身，所以在拍摄时应谨慎的拿出相机，并拍掉手上的沙子，避免相机跟沙子接触。若不小心沾上沙子可用嘴猛力吹掉沙子。有风的情况下尽量不要使用相机，并用密封性好的袋子或者相机套包住相机。

　　20注意环保
在沙漠野餐、露营之后，一定要将垃圾带走，不要埋在沙子下面，这是对自然、对户外最起码的尊重！



在沙漠里正确判断方向

因为视野空旷，人们难在广阔的沙漠上找到定向的参照物。这时，使用地图以及 GPS导航，可将在沙漠中迷途的可能性降到最低。



另外，我们也可以利用自然特征来判定方向：

⑴、用北极星判定方位

我国位于北半球，终年夜间都可看到北极星。北极星是正北天空中一颗较亮的恒星，夜间找到了北极星就找到了正北方。

⑵、利用太阳判定方向

太阳东起西落，而影子则是由西向东移。例如，在我国西部的沙漠，早晨，太阳从东方升起，一切物体的阴影都倒向西方，中午时太阳位于正南，影子便指向北方，下午，太阳到正西，影子则指向正东。

⑶、利用沙丘走向判定方向

在我国西北地区，由于盛行西北风，沙丘一般形成东南走向，沙丘西北面是迎风面，坡度较小、沙质较硬。东南面背风，坡度大、沙质松软。另外，沙漠中的植物，如红柳、梭梭柴、骆驼刺等都向东南方向倾斜。但这里还是要说明的是，上述是沙漠地区的一般特点，风向还因地区的不同而异，沙丘的走向也有所不同，要得出正确的判断，须事先掌握目标地区的气象和地貌。`}</Text>
      </View>
    );
  };

  add= ()=>{
    this.setState({loading1: true})
    setTimeout(()=>{
      this.setState({loading1: false})
      this.props.change.bind(this.props.ctx)
      Toast.success('添加成功');

    }, 500)
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={[
            styles.headerContainer,
            { backgroundColor: "#616389", marginTop: 20 }
          ]}
        >
          <Icon color="white" name="input" size={62} />
          <Text style={styles.heading}>新建计划</Text>
        </View>
        <View style={{ alignItems: "center", marginBottom: 16 }}>
          <Input
            containerStyle={{ width: "90%" }}
            placeholder="名称"
            label="计划"
            labelStyle={{ marginTop: 16 }}
          />
          <Input
            containerStyle={styles.inputContainerStyle}
            placeholder="类型"
          />
          <Input
            leftIcon={
              <Icon
                name="map-marker"
                type="font-awesome"
                color="#86939e"
                size={25}
              />
            }
            containerStyle={styles.inputContainerStyle}
            placeholder="地点"
          />
          <Input
            containerStyle={styles.inputContainerStyle}
            placeholder="人数"
          />
          <Input
            containerStyle={styles.inputContainerStyle}
            placeholder="天数"
          />
          <Input
            containerStyle={styles.inputContainerStyle}
            placeholder="开始时间"
          />
          <Button
            title="生成"
            loading={this.state.loading}
            loadingProps={{
              size: "large",
              color: "rgba(111, 202, 186, 1)"
            }}
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={{
              backgroundColor: "rgba(92, 99,216, 1)",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5,
              paddingVertical: 10
            }}
            containerStyle={{ marginTop: 20, width: 300, height: 45 }}
            onPress={this.search}
          />
        </View>
        {this.state.show && (
          <Card containerStyle={{ marginTop: 15 }} title="攻略推荐">
            <View>
              <Tile
                imageSrc={{
                  uri: "https://32hy.com/hy/Public/Uploads/1519002572.jpg"
                }}
                title="徒步穿越荒野沙漠(desert)的技巧."
                titleStyle={{ fontSize: 20 }}
                featured
                caption=""
                activeOpacity={1}
                width={310}
              />
            </View>
            <View style={styles.productRow}>
              {this.renderDescription()}
            </View>
            <View style={styles.productRow}>{this.renderDetail()}</View>
          </Card>
        )}
        {
          this.state.show &&  (
            <View style={{ alignItems: "center", marginBottom: 16 }}>

            <Button
            title="添加到日程"
            loading={this.state.loading1}
            loadingProps={{
              size: "large",
              color: "rgba(111, 202, 186, 1)"
            }}
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={{
              backgroundColor: "rgba(92, 99,216, 1)",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5,
              paddingVertical: 10
            }}
            containerStyle={{ marginTop: 20, width: 300, height: 45 }}
            onPress={this.add}
          />
          </View>
          )
        }
      </ScrollView>
    );
  }
}

const Colors = {
  red: '#FF3B30',
  orange: '#FF9500',
  yellow: '#FFCC00',
  green: '#4CD964',
  tealBlue: '#5AC8FA',
  blue: '#007AFF',
  purple: '#5856D6',
  pink: '#FF2D55',

  white: '#FFFFFF',
  customGray: '#EFEFF4',
  lightGray: '#E5E5EA',
  lightGray2: '#D1D1D6',
  midGray: '#C7C7CC',
  gray: '#8E8E93',
  black: '#000000',
}


const styles = StyleSheet.create({
  priceText: {
    marginBottom: 5,
    letterSpacing: 1,

    color: Colors.black,
    fontSize: 24,
    fontWeight: '400',
  },
  detailText: {
    marginBottom: 4,
    color: Colors.black,
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  subDetailText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '100',
    lineHeight: 28,
    letterSpacing: 0.5,
  },
  descriptionText: {
    marginBottom: 4,
    color: Colors.gray,
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 1,
  },
  productRow: {
    margin: 10,
  },
  container: {
    backgroundColor: 'white',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#B46486',
  },
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },
  contentView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  triangleLeft: {
    position: 'absolute',
    left: -20,
    bottom: 0,
    width: 0,
    height: 0,
    borderRightWidth: 20,
    borderRightColor: 'white',
    borderBottomWidth: 25,
    borderBottomColor: 'transparent',
    borderTopWidth: 25,
    borderTopColor: 'transparent',
  },
  triangleRight: {
    position: 'absolute',
    right: -20,
    top: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderLeftColor: 'white',
    borderBottomWidth: 25,
    borderBottomColor: 'transparent',
    borderTopWidth: 25,
    borderTopColor: 'transparent',
  },
  inputContainerStyle: {
    marginTop: 16,
    width: '90%',
  },
});
