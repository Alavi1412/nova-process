import { createWidget } from 'discourse/widgets/widget';
import { h } from 'virtual-dom';
import { avatarImg } from 'discourse/widgets/post';
import { cook } from 'discourse/lib/text';
import RawHtml from 'discourse/widgets/raw-html';
import showModal from 'discourse/lib/show-modal';
import Composer from 'discourse/models/composer';
import { getOwner } from 'discourse-common/lib/get-owner';
import NotificationsButton from 'discourse/components/notifications-button';



export default createWidget('nova_process', {
  tagName: 'div.nova.widget-container',
  buildKey: (attrs) => 'nova_process',

  defaultState(attrs) {
    return {
      topic: attrs.topic,
      bookmarked: attrs.topic ? attrs.topic.bookmarked : null
    }
  },

  canInviteToForum() {
    return Discourse.User.currentProp('can_invite_to_forum');
  },

  toggleBookmark() {
    this.state.bookmarked = !this.state.bookmarked
    const topicController = this.register.lookup('controller:topic')
    topicController.send('toggleBookmark')
  },

  sendShowLogin() {
    const appRoute = this.register.lookup('route:application');
    appRoute.send('showLogin');
  },

  sendShowCreateAccount() {
    const appRoute = this.register.lookup('route:application');
    appRoute.send('showCreateAccount');
  },

  showInvite() {
    const topicRoute = this.register.lookup('route:topic');
    topicRoute.send('showLogin');
  },

  createTopic() {
    const cController = this.register.lookup('controller:composer');
    const dtController = this.register.lookup('controller:discovery/topics');
    cController.open({
      categoryId: dtController.get('category.id'),
      action: Composer.CREATE_TOPIC,
      draftKey: dtController.get('model.draft_key'),
      draftSequence: dtController.get('model.draft_sequence')
    });
  },

  html(attrs, state) {
    const { currentUser } = this;
    const topic = state.topic;
    const cate = attrs.category;
    var days;
    var count;
    const category = attrs.category;
    let contents = [];
    

    const path = getOwner(this).lookup('controller:application').get('currentPath');
    console.log(cate);
    console.log(topic);
    console.log(path);
    var v1 = 0, size = 0;
    var unread = 0;
    var data = Discourse.Category.list();
    var level1 = 0, level2 = 0, level3 = 0, level4 = 0;
    if(path == "discovery.category" || path == "discovery.parentCategory")
    {
    if (cate.parentCategory)
    {
        console.log("SUB CATEGORY");
      if (Discourse.SiteSettings[cate.parentCategory.slug] == true) 
      {
            for (var i = 0; i < data.length; i++) 
          {
              if (data[i].get('parent_category_id') == cate.parentCategory.id) 
              {
                if ( data[i].slug == "information" )
              {
                level1 = data[i].topic_count;
              }
              else if (data[i].slug == "problem") 
              {
                level2 = data[i].topic_count;
              }
              else if (data[i].slug == "idea") 
              {
                level3 = data[i].topic_count;
              }
              else if (data[i].slug == "solution") 
              {
                level4 = data[i].topic_count;
              }
          }
        }
                contents.push(h("div.row", [
          h("section.col-xlg-4", [
            h("h2.mb10", ["فرآیند " , h("a.what", {attributes:{href: "t/ابتکار-جمعی-یعنی-چه-و-چه-جوری-کار-میکنه؟/3601"}}, "نوآ")]),
            h("ul.progress.vertical",[
              h("li.step1", h("a", {attributes: {href: "/c/" + cate.parentCategory.slug + "/information"}}, [h("h3","تحقیق") , h("h4.topicnum", level1 + " تاپیک")])),
              h("li.step2", h("a", {attributes: {href: "/c/" + cate.parentCategory.slug + "/problem"}}, [h("h3","انتخاب مشکل") , h("h4.topicnum", level2 + " تاپیک")])),
              h("li.step3", h("a", {attributes: {href: "/c/" + cate.parentCategory.slug + "/idea"}}, [h("h3","ایده پردازی") , h("h4.topicnum", level3 + " تاپیک")])),
              h("li.step4", h("a", {attributes: {href: "/c/" + cate.parentCategory.slug + "/solution"}}, [h("h3","تکمیل راهکار") , h("h4.topicnum", level4 + " تاپیک")]))
              ])
            ])
          ]));
        
      }
      else
      {
          for (var i = 0; i < data.length; i++) 
        {
            if (data[i].get('parent_category_id') == cate.parentCategory.id) 
            {
                if ( data[i].slug == "information" )
                {
                    level1 = data[i].topic_count;
                }
                else if (data[i].slug == "problem") 
                {
                    level2 = data[i].topic_count;
                }
                    else if (data[i].slug == "idea") 
                {
                    level3 = data[i].topic_count;
                }
                else if (data[i].slug == "solution") 
                {   
                    level4 = data[i].topic_count;
                }
            }
        }
        contents.push(h("div.row", [
          h("section.col-xlg-4", [
            h("h2.mb10", ["فرآیند " , h("a.what", {attributes:{href: "t/ابتکار-جمعی-یعنی-چه-و-چه-جوری-کار-میکنه؟/3601"}}, "نوآ")]),
            h("ul.progress.vertical",[
              h("li.done", h("a", {attributes: {href: "/c/" + cate.parentCategory.slug + "/information"}}, [h("h3","تحقیق") , h("h4.topicnum", level1 + " تاپیک")])),
              h("li.done", h("a", {attributes: {href: "/c/" + cate.parentCategory.slug + "/problem"}}, [h("h3","انتخاب مشکل") , h("h4.topicnum", level2 + " تاپیک")])),
              h("li.done", h("a", {attributes: {href: "/c/" + cate.parentCategory.slug + "/idea"}}, [h("h3","ایده پردازی") , h("h4.topicnum", level3 + " تاپیک")])),
              h("li.done", h("a", {attributes: {href: "/c/" + cate.parentCategory.slug + "/solution"}}, [h("h3","تکمیل راهکار") , h("h4.topicnum", level4 + " تاپیک")]))
              ])
            ])
          ]));
      }
    }
    else
    {
        if (Discourse.SiteSettings[cate.slug] == true) 
      {
            for (var i = 0; i < data.length; i++) 
          {
              if (data[i].get('parent_category_id') == cate.id) 
              {
                if ( data[i].slug == "information" )
              {
                level1 = data[i].topic_count;
              }
              else if (data[i].slug == "problem") 
              {
                level2 = data[i].topic_count;
              }
              else if (data[i].slug == "idea") 
              {
                level3 = data[i].topic_count;
              }
              else if (data[i].slug == "solution") 
              {
                level4 = data[i].topic_count;
              }
          }
        }
                contents.push(h("div.row", [
          h("section.col-xlg-4", [
            h("h2.mb10", ["فرآیند " , h("a.what", {attributes:{href: "t/ابتکار-جمعی-یعنی-چه-و-چه-جوری-کار-میکنه؟/3601"}}, "نوآ")]),
            h("ul.progress.vertical",[
              h("li.step1", h("a", {attributes: {href: "/c/" + cate.slug + "/information"}}, [h("h3","تحقیق") , h("h4.topicnum", level1 + " تاپیک")])),
              h("li.step2", h("a", {attributes: {href: "/c/" + cate.slug + "/problem"}}, [h("h3","انتخاب مشکل") , h("h4.topicnum", level2 + " تاپیک")])),
              h("li.step3", h("a", {attributes: {href: "/c/" + cate.slug + "/idea"}}, [h("h3","ایده پردازی") , h("h4.topicnum", level3 + " تاپیک")])),
              h("li.step4", h("a", {attributes: {href: "/c/" + cate.slug + "/solution"}}, [h("h3","تکمیل راهکار") , h("h4.topicnum", level4 + " تاپیک")]))
              ])
            ])
          ]));
        
      }
      else
      {
          for (var i = 0; i < data.length; i++) 
        {
            if (data[i].get('parent_category_id') == cate.id) 
            {
                if ( data[i].slug == "information" )
                {
                    level1 = data[i].topic_count;
                }
                else if (data[i].slug == "problem") 
                {
                    level2 = data[i].topic_count;
                }
                    else if (data[i].slug == "idea") 
                {
                    level3 = data[i].topic_count;
                }
                else if (data[i].slug == "solution") 
                {   
                    level4 = data[i].topic_count;
                }
            }
        }
        contents.push(h("div.row", [
          h("section.col-xlg-4", [
            h("h2.mb10", ["فرآیند " , h("a.what", {attributes:{href: "t/ابتکار-جمعی-یعنی-چه-و-چه-جوری-کار-میکنه؟/3601"}}, "نوآ")]),
            h("ul.progress.vertical",[
              h("li.done", h("a", {attributes: {href: "/c/" + cate.slug + "/information"}}, [h("h3","تحقیق") , h("h4.topicnum", level1 + " تاپیک")])),
              h("li.done", h("a", {attributes: {href: "/c/" + cate.slug + "/problem"}}, [h("h3","انتخاب مشکل") , h("h4.topicnum", level2 + " تاپیک")])),
              h("li.done", h("a", {attributes: {href: "/c/" + cate.slug + "/idea"}}, [h("h3","ایده پردازی") , h("h4.topicnum", level3 + " تاپیک")])),
              h("li.done", h("a", {attributes: {href: "/c/" + cate.slug + "/solution"}}, [h("h3","تکمیل راهکار") , h("h4.topicnum", level4 + " تاپیک")]))
              ])
            ])
          ]));
      }
    }
    contents.push(h("button.PayPingCheckout", {attributes:{onclick:"startt()"}}, "حمایت"));

        
        contents.push(this.attach('category-notifications-button', {
          className: 'btn widget-button',
          category: category,
          showFullTitle: false
          }));
    }
  


    return h('div.widget-inner', contents);
  }

});
