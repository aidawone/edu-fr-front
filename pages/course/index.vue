<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" href="#">全部</a>
                </li>
                <li
                  v-for="(item,index) in parentSubjects"
                  :key="index"
                  :class="{active:oneIndex==index}"
                >
                  <a
                    :title="item.title"
                    href="#"
                    @click="getChildrenSubject(item.id,index)"
                  >{{item.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <dl v-if="childrenSubjects.length>0">
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li
                  v-for="(children,index) in childrenSubjects"
                  :key="index"
                  :class="{active:twoIndex==index}"
                >
                  <a
                    :title="children.title"
                    href="#"
                    @click="clickChildrenSubject(children.id,index)"
                  >{{children.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
             <li :class="{'current bg-orange':buyCountSort!=''}">
                <a title="销量" href="javascript:void(0);" @click="searchBuyCount()">销量
                <span :class="{hide:buyCountSort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':gmtCreateSort!=''}">
                <a title="最新" href="javascript:void(0);" @click="searchGmtCreate()">最新
                <span :class="{hide:gmtCreateSort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':priceSort!=''}">
                <a title="价格" href="javascript:void(0);" @click="searchPrice()">价格&nbsp;
                  <span :class="{hide:priceSort==''}">↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="map.total==0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="comm-course-list" v-if="map.total>0">
            <ul class="of" id="bna">
              <li v-for="item in map.items" :key="item.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="item.cover" class="img-responsive" alt="听力口语" />
                    <div class="cc-mask">
                      <a :href="'/course/'+item.id" :title="item.title" class="comm-btn c-btn-1">开始学习</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a
                      :href="'/course/'+item.id"
                      title="听力口语"
                      class="course-title fsize18 c-333"
                    >{{item.title}}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green" v-if="item.price ===0">
                      <i class="c-fff fsize12 f-fA">免费</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">9634人学习</i>
                      |
                      <i class="c-999 f-fA">9634评论</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <a
              :class="{undisable: !map.hasPrevious}"
              href="#"
              title="首页"
              @click.prevent="gotoPage(1)"
            >首</a>
            <a
              :class="{undisable: !map.hasPrevious}"
              href="#"
              title="前一页"
              @click.prevent="gotoPage(map.current-1)"
            >&lt;</a>
            <a
              v-for="page in map.pages"
              :key="page"
              :class="{current: map.current == page, undisable: map.current == page}"
              :title="'第'+page+'页'"
              href="#"
              @click.prevent="gotoPage(page)"
            >{{ page }}</a>
            <a
              :class="{undisable: !map.hasNext}"
              href="#"
              title="后一页"
              @click.prevent="gotoPage(map.current+1)"
            >&gt;</a>
            <a
              :class="{undisable: !map.hasNext}"
              href="#"
              title="末页"
              @click.prevent="gotoPage(map.pages)"
            >末</a>
            <div class="clear" />
          </div>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import Course from "@/api/course";
import Subject from "@/api/subject";
export default {
  data() {
    return {
      map: [], //课程列表
      parentSubjects: [], // 一级分类
      childrenSubjects: [], //二级分类

      query: {
        page: 1,
        size: 8
      },
      //查询条件
      oneIndex: -1,
      twoIndex: -1,
      buyCountSort: "",
      gmtCreateSort: "",
      priceSort: ""
    };
  },
  //异步
  created() {
    this.initCourse();
    this.getParentSubject();
  },
  methods: {
    //初始化课程
    initCourse() {
      Course.coursePageCondition(this.query).then(response => {
        this.map = response.data.data;
      });
    },
    //一级分类
    getParentSubject() {
      Subject.getSubjectsTree().then(response => {
        this.parentSubjects = response.data.data.items;
      });
    },
    //二级分类 点击一级分类获得二级分类
    getChildrenSubject(id, index) {
      this.query.subjectParentId = id;

      this.oneIndex = index;
      this.twoIndex = -1;
      this.childrenSubjects = [];

      this.gotoPage(1);
      for (let i = 0; i < this.parentSubjects.length; i++) {
        if (this.parentSubjects[i].id == id) {
          this.childrenSubjects = this.parentSubjects[i].child;
        }
      }
    },
    clickChildrenSubject(id, index) {
      this.twoIndex = index;
      this.query.subjectId = id;
      this.gotoPage(1);
    },
    gotoPage(page) {
      this.query.page = page;
      this.initCourse();
    },
    searchBuyCount(){
      this.buyCountSort = '1'
      this.gmtCreateSort = ''
      this.priceSort = ''

      this.query.buyCountSort = this.buyCountSort
      this.query.gmtCreateSort = this.gmtCreateSort
      this.query.priceSort = this.priceSort
      //赋值
      this.gotoPage(1)
    },
    searchGmtCreate(){
      this.buyCountSort = ''
      this.gmtCreateSort = '1'
      this.priceSort = ''

      this.query.buyCountSort = this.buyCountSort
      this.query.gmtCreateSort = this.gmtCreateSort
      this.query.priceSort = this.priceSort
      //赋值
      this.gotoPage(1)

    },
    searchPrice(){
      this.buyCountSort = ''
      this.gmtCreateSort = ''
      this.priceSort = '1'

      this.query.buyCountSort = this.buyCountSort
      this.query.gmtCreateSort = this.gmtCreateSort
      this.query.priceSort = this.priceSort
      //赋值
      this.gotoPage(1)

    }
  }
};
</script>
<style scoped>
.active {
  background: #bdbdbd;
}
.hide {
  display: none;
}
.show {
  display: block;
}
</style>