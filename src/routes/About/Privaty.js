import React, { Component } from 'react'
import { connect } from 'dva'
import { Mixin } from '@components'

import * as styles from '@routes/About/index.less'

@connect(({ Loading, dispatch, }) => ({
  dispatch,
  loading: Loading
}))
export default class View extends Component {
  state = {}

  componentDidMount() {
    this.startInit()
  }

  startInit = () => {

  }


  render() {
    const {} = this.props

    return (
      <Mixin.Child that={this} >
        <div className={styles.service} >
          <div className={styles.aboutTitle}>隐私政策</div>
          <p className={styles.black}>本隐私声明适用Hopex的所有相关服务，Hopex尊重并保护所有使用Hopex平台服务用户的个人隐私权。为了给您提供更准确、更有个性化的服务，会按照本隐私权政策的规定使用和披露您的个人信息但Hopex将以高度的勤勉、审慎义务对待这些信息。除本隐私权政策另有规定外，在未征得您事先许可的情况下，Hopex不会将这些信息对外披露或向第三方提供。Hopex会不时更新本隐私权政策。 您在同意Hopex服务协议之时，即视为您已经同意本隐私权政策全部内容。本隐私权政策属于Hopex服务协议不可分割的一部分。</p>
          <p className={styles.title}>1、适用范围</p>
          <p className={styles.content}>在您注册或激活可以登录Hopex平台的账户时，您在Hopex平台或者其关联公司提供的其他平台提供的个人注册信息（应法律法规要求需公示的企业名称等相关工商注册信息以及自然人经营者的信息除外）； 在您使用Hopex平台服务，或访问Hopex平台网页时，Hopex自动接收并记录的您的浏览器和计算机上的信息，包括但不限于您的IP地址、浏览器的类型、使用的语言、访问日期和时间、软硬件特征信息及您需求的网页记录等数据； Hopex通过合法途径从商业伙伴处取得的用户个人数据。</p>
          <p className={styles.title}>2、信息使用</p>
          <p className={styles.content}>Hopex不会向任何无关第三方提供、出售、出租、分享或交易您的个人信息，除非事先得到您的许可，或该第三方和Hopex（含Hopex关联公司）单独或共同为您提供服务，且在该服务结束后，其将被禁止访问包括其以前能够访问的所有这些资料。 Hopex亦不允许任何第三方以任何手段收集、编辑、出售或者无偿传播您的个人信息。任何Hopex平台用户如从事上述活动，一经发现，Hopex有权立即终止与该用户的服务协议。</p>
          <p className={styles.title}>3、信息披露</p>
          <p className={styles.content}>在如下情况下，Bitinfi将依据您的个人意愿或法律的规定全部或部分的披露您的个人信息： 经您事先同意，向第三方披露； 如您是适格的知识产权投诉人并已提起投诉，应被投诉人要求，向被投诉人披露，以便双方处理可能的权利纠纷； 根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露； 如您出现违反有关法律、法规或者Bitinfi服务协议或相关规则的情况，需要向第三方披露； 为提供您所要求的产品和服务，而必须和第三方分享您的个人信息； 在Bitinfi平台上创建的某一交易中，如交易任何一方履行或部分履行了交易义务并提出信息披露请求的，Bitinfi有权决定向该用户提供其交易对方的联络方式等必要信息，以促成交易的完成或纠纷的解决。 其它Bitinfi根据法律、法规或者网站政策认为合适的披露。</p>
          <p className={styles.title}>4、信息存储和交换</p>
          <p className={styles.content}>Hopex收集的有关您的信息和资料将保存在Hopex及（或）其关联公司的服务器上，这些信息和资料可能传送至您所在国家、地区或Hopex收集信息和资料所在地的境外并在境外被访问、存储和展示。</p>
          <p className={styles.title}>5、Cookie的使用</p>
          <p className={styles.content}>在您未拒绝接受cookies的情况下，Hopex会在您的计算机上设定或取用cookies，以便您能登录或使用依赖于cookies的Hopex平台服务或功能。Hopex使用cookies可为您提供更加周到的个性化服务包括推广服务。 您有权选择接受或拒绝接受cookies。您可以通过修改浏览器设置的方式拒绝接受cookies。但如果您选择拒绝接受cookies，则您可能无法登录或使用依赖于cookies的Hopex平台服务或功能。 通过Hopex所设cookies所取得的有关信息，将适用本政策；</p>
          <p className={styles.title}>6、信息安全</p>
          <p className={styles.content}>您的账户均有安全保护功能，请妥善保管您的账户及密码信息。Hopex将通过向其它服务器备份、对用户密码进行加密等安全措施确保您的信息不丢失，不被滥用和变造。尽管有前述安全措施，但同时也请您注意在信息网络上不存在“完善的安全措施”。 在使用Hopex平台服务进行网上交易时，您不可避免的要向交易对方或潜在的交易对方披露自己的个人信息，如联络方式或者邮政地址。请您妥善保护自己的个人信息，仅在必要的情形下向他人提供。如您发现自己的个人信息泄密，尤其是你的账户及密码发生泄露，请您立即联络Hopex客服，以便Hopex采取相应措施。</p>
        </div >
      </Mixin.Child >
    )
  }
}


