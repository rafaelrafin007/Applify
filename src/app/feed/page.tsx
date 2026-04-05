const suggestedPeople = [
  { name: "Steve Jobs", role: "CEO of Apple", image: "/assets/images/people1.png" },
  { name: "Ryan Roslansky", role: "CEO of Linkedin", image: "/assets/images/people2.png" },
  { name: "Dylan Field", role: "CEO of Figma", image: "/assets/images/people3.png" },
];

const stories = [
  { image: "/assets/images/card_ppl2.png", name: "Ryan Roslansky" },
  { image: "/assets/images/card_ppl3.png", name: "Dylan Field" },
  { image: "/assets/images/card_ppl4.png", name: "Steve Jobs" },
];

const posts = [
  {
    id: "p1",
    author: "Karim Saif",
    time: "5 minute ago",
    visibility: "Public",
    title: "-Healthy Tracking App",
    image: "/assets/images/timeline_img.png",
  },
  {
    id: "p2",
    author: "Karim Saif",
    time: "12 minute ago",
    visibility: "Public",
    title: "-Productivity Setup",
    image: "/assets/images/timeline_img.png",
  },
];

const friends = [
  { name: "Steve Jobs", role: "CEO of Apple", image: "/assets/images/people1.png", online: false },
  { name: "Ryan Roslansky", role: "CEO of Linkedin", image: "/assets/images/people2.png", online: true },
  { name: "Dylan Field", role: "CEO of Figma", image: "/assets/images/people3.png", online: true },
  { name: "Steve Jobs", role: "CEO of Apple", image: "/assets/images/people1.png", online: false },
];

export default function FeedPage() {
  return (
    <div className="_layout _layout_main_wrapper">
      <div className="_main_layout">
        <nav className="navbar navbar-expand-lg navbar-light _header_nav _padd_t10">
          <div className="container _custom_container">
            <div className="_logo_wrap">
              <a className="navbar-brand" href="/feed">
                <img src="/assets/images/logo.svg" alt="Logo" className="_nav_logo" />
              </a>
            </div>

            <div className="_header_form ms-auto">
              <form className="_header_form_grp">
                <input
                  className="form-control me-2 _inpt1"
                  type="search"
                  placeholder="input search text"
                  aria-label="Search"
                />
              </form>
            </div>

            <ul className="navbar-nav mb-2 mb-lg-0 _header_nav_list ms-auto _mar_r8">
              <li className="nav-item _header_nav_item">
                <a className="nav-link _header_nav_link_active _header_nav_link" aria-current="page" href="/feed">
                  Home
                </a>
              </li>
              <li className="nav-item _header_nav_item">
                <button type="button" className="nav-link _header_nav_link" disabled aria-disabled="true">
                  Network
                </button>
              </li>
              <li className="nav-item _header_nav_item">
                <button
                  type="button"
                  className="nav-link _header_nav_link _header_notify_btn"
                  disabled
                  aria-disabled="true"
                  title="Interactive notifications are not enabled in Phase 1."
                >
                  Notifications
                </button>
              </li>
              <li className="nav-item _header_nav_item">
                <span className="_nav_profile_link">
                  <img src="/assets/images/profile.png" alt="Profile" className="_profile_img" />
                </span>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container _custom_container">
          <div className="_layout_inner_wrap">
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                <div className="_layout_left_sidebar_wrap">
                  <div className="_layout_left_sidebar_inner">
                    <div className="_left_inner_area_explore _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
                      <h4 className="_left_inner_area_explore_title _title5 _mar_b24">Explore</h4>
                      <ul className="_left_inner_area_explore_list">
                        <li className="_left_inner_area_explore_item _explore_item">
                          <span className="_left_inner_area_explore_link">Learning</span>
                          <span className="_left_inner_area_explore_link_txt">New</span>
                        </li>
                        <li className="_left_inner_area_explore_item">
                          <span className="_left_inner_area_explore_link">Insights</span>
                        </li>
                        <li className="_left_inner_area_explore_item">
                          <span className="_left_inner_area_explore_link">Find friends</span>
                        </li>
                        <li className="_left_inner_area_explore_item">
                          <span className="_left_inner_area_explore_link">Bookmarks</span>
                        </li>
                        <li className="_left_inner_area_explore_item">
                          <span className="_left_inner_area_explore_link">Group</span>
                        </li>
                        <li className="_left_inner_area_explore_item _explore_item">
                          <span className="_left_inner_area_explore_link">Gaming</span>
                          <span className="_left_inner_area_explore_link_txt">New</span>
                        </li>
                        <li className="_left_inner_area_explore_item">
                          <span className="_left_inner_area_explore_link">Settings</span>
                        </li>
                        <li className="_left_inner_area_explore_item">
                          <span className="_left_inner_area_explore_link">Save post</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="_layout_left_sidebar_inner">
                    <div className="_left_inner_area_suggest _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
                      <div className="_left_inner_area_suggest_content _mar_b24">
                        <h4 className="_left_inner_area_suggest_content_title _title5">Suggested People</h4>
                        <span className="_left_inner_area_suggest_content_txt">
                          <button type="button" className="_left_inner_area_suggest_content_txt_link" disabled>
                            See All
                          </button>
                        </span>
                      </div>

                      {suggestedPeople.map((person) => (
                        <div className="_left_inner_area_suggest_info" key={person.name}>
                          <div className="_left_inner_area_suggest_info_box">
                            <div className="_left_inner_area_suggest_info_image">
                              <img src={person.image} alt={person.name} className="_info_img1" />
                            </div>
                            <div className="_left_inner_area_suggest_info_txt">
                              <h4 className="_left_inner_area_suggest_info_title">{person.name}</h4>
                              <p className="_left_inner_area_suggest_info_para">{person.role}</p>
                            </div>
                          </div>
                          <div className="_left_inner_area_suggest_info_link">
                            <button type="button" className="_info_link" disabled>
                              Connect
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="_layout_left_sidebar_inner">
                    <div className="_left_inner_area_event _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
                      <div className="_left_inner_event_content">
                        <h4 className="_left_inner_event_title _title5">Events</h4>
                        <button type="button" className="_left_inner_event_link" disabled>
                          See all
                        </button>
                      </div>

                      <div className="_left_inner_event_card_link">
                        <div className="_left_inner_event_card">
                          <div className="_left_inner_event_card_iamge">
                            <img src="/assets/images/feed_event1.png" alt="Event" className="_card_img" />
                          </div>
                          <div className="_left_inner_event_card_content">
                            <div className="_left_inner_card_date">
                              <p className="_left_inner_card_date_para">10</p>
                              <p className="_left_inner_card_date_para1">Jul</p>
                            </div>
                            <div className="_left_inner_card_txt">
                              <h4 className="_left_inner_event_card_title">No more terrorism no more cry</h4>
                            </div>
                          </div>
                          <hr className="_underline" />
                          <div className="_left_inner_event_bottom">
                            <p className="_left_iner_event_bottom">17 People Going</p>
                            <button type="button" className="_left_iner_event_bottom_link" disabled>
                              Going
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <div className="_layout_middle_wrap">
                  <div className="_layout_middle_inner">
                    <div className="_feed_inner_ppl_card _mar_b16">
                      <div className="row">
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col">
                          <div className="_feed_inner_profile_story _b_radious6">
                            <div className="_feed_inner_profile_story_image">
                              <img src="/assets/images/card_ppl1.png" alt="Your story" className="_profile_story_img" />
                              <div className="_feed_inner_story_txt">
                                <div className="_feed_inner_story_btn">
                                  <button className="_feed_inner_story_btn_link" type="button" disabled>
                                    +
                                  </button>
                                </div>
                                <p className="_feed_inner_story_para">Your Story</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {stories.map((story) => (
                          <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col" key={story.image}>
                            <div className="_feed_inner_public_story _b_radious6">
                              <div className="_feed_inner_public_story_image">
                                <img src={story.image} alt={story.name} className="_public_story_img" />
                                <div className="_feed_inner_pulic_story_txt">
                                  <p className="_feed_inner_pulic_story_para">{story.name}</p>
                                </div>
                                <div className="_feed_inner_public_mini">
                                  <img src="/assets/images/mini_pic.png" alt="Story mini" className="_public_mini_img" />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="_feed_inner_text_area _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16">
                      <div className="_feed_inner_text_area_box">
                        <div className="_feed_inner_text_area_box_image">
                          <img src="/assets/images/txt_img.png" alt="User avatar" className="_txt_img" />
                        </div>
                        <div className="form-floating _feed_inner_text_area_box_form">
                          <textarea
                            className="form-control _textarea"
                            placeholder="Write something"
                            id="feed-post-box"
                            defaultValue=""
                          />
                          <label className="_feed_textarea_label" htmlFor="feed-post-box">
                            Write something ...
                          </label>
                        </div>
                      </div>

                      <div className="_feed_inner_text_area_bottom">
                        <div className="_feed_inner_text_area_item">
                          <div className="_feed_inner_text_area_bottom_photo _feed_common">
                            <button type="button" className="_feed_inner_text_area_bottom_photo_link" disabled>
                              Photo
                            </button>
                          </div>
                          <div className="_feed_inner_text_area_bottom_video _feed_common">
                            <button type="button" className="_feed_inner_text_area_bottom_photo_link" disabled>
                              Video
                            </button>
                          </div>
                          <div className="_feed_inner_text_area_bottom_event _feed_common">
                            <button type="button" className="_feed_inner_text_area_bottom_photo_link" disabled>
                              Event
                            </button>
                          </div>
                          <div className="_feed_inner_text_area_bottom_article _feed_common">
                            <button type="button" className="_feed_inner_text_area_bottom_photo_link" disabled>
                              Article
                            </button>
                          </div>
                        </div>
                        <div className="_feed_inner_text_area_btn">
                          <button type="button" className="_feed_inner_text_area_btn_link" disabled>
                            <span>Post</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {posts.map((post) => (
                      <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16" key={post.id}>
                        <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
                          <div className="_feed_inner_timeline_post_top">
                            <div className="_feed_inner_timeline_post_box">
                              <div className="_feed_inner_timeline_post_box_image">
                                <img src="/assets/images/post_img.png" alt={post.author} className="_post_img" />
                              </div>
                              <div className="_feed_inner_timeline_post_box_txt">
                                <h4 className="_feed_inner_timeline_post_box_title">{post.author}</h4>
                                <p className="_feed_inner_timeline_post_box_para">
                                  {post.time} . <span>{post.visibility}</span>
                                </p>
                              </div>
                            </div>
                            <div className="_feed_inner_timeline_post_box_dropdown">
                              <button
                                type="button"
                                className="_feed_timeline_post_dropdown_link"
                                disabled
                                title="Post options are static in Phase 1."
                              >
                                ...
                              </button>
                            </div>
                          </div>

                          <h4 className="_feed_inner_timeline_post_title">{post.title}</h4>
                          <div className="_feed_inner_timeline_image">
                            <img src={post.image} alt={post.title} className="_time_img" />
                          </div>
                        </div>

                        <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
                          <div className="_feed_inner_timeline_total_reacts_image">
                            <img src="/assets/images/react_img1.png" alt="React" className="_react_img1" />
                            <img src="/assets/images/react_img2.png" alt="React" className="_react_img" />
                            <img src="/assets/images/react_img3.png" alt="React" className="_react_img _rect_img_mbl_none" />
                            <img src="/assets/images/react_img4.png" alt="React" className="_react_img _rect_img_mbl_none" />
                            <img src="/assets/images/react_img5.png" alt="React" className="_react_img _rect_img_mbl_none" />
                            <p className="_feed_inner_timeline_total_reacts_para">9+</p>
                          </div>
                          <div className="_feed_inner_timeline_total_reacts_txt">
                            <p className="_feed_inner_timeline_total_reacts_para1">
                              <span>12</span> Comment
                            </p>
                            <p className="_feed_inner_timeline_total_reacts_para2">
                              <span>122</span> Share
                            </p>
                          </div>
                        </div>

                        <div className="_feed_inner_timeline_reaction">
                          <button className="_feed_inner_timeline_reaction_emoji _feed_reaction _feed_reaction_active" type="button" disabled>
                            <span className="_feed_inner_timeline_reaction_link">Haha</span>
                          </button>
                          <button className="_feed_inner_timeline_reaction_comment _feed_reaction" type="button" disabled>
                            <span className="_feed_inner_timeline_reaction_link">Comment</span>
                          </button>
                          <button className="_feed_inner_timeline_reaction_share _feed_reaction" type="button" disabled>
                            <span className="_feed_inner_timeline_reaction_link">Share</span>
                          </button>
                        </div>

                        <div className="_feed_inner_timeline_cooment_area">
                          <div className="_feed_inner_comment_box">
                            <form className="_feed_inner_comment_box_form">
                              <div className="_feed_inner_comment_box_content">
                                <div className="_feed_inner_comment_box_content_image">
                                  <img src="/assets/images/comment_img.png" alt="Comment avatar" className="_comment_img" />
                                </div>
                                <div className="_feed_inner_comment_box_content_txt">
                                  <textarea className="form-control _comment_textarea" placeholder="Write a comment" defaultValue="" />
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                <div className="_layout_right_sidebar_wrap">
                  <div className="_layout_right_sidebar_inner">
                    <div className="_right_inner_area_info _padd_t24 _padd_b24 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
                      <div className="_right_inner_area_info_content _mar_b24">
                        <h4 className="_right_inner_area_info_content_title _title5">You Might Like</h4>
                        <span className="_right_inner_area_info_content_txt">
                          <button type="button" className="_right_inner_area_info_content_txt_link" disabled>
                            See All
                          </button>
                        </span>
                      </div>
                      <hr className="_underline" />
                      <div className="_right_inner_area_info_ppl">
                        <div className="_right_inner_area_info_box">
                          <div className="_right_inner_area_info_box_image">
                            <img src="/assets/images/Avatar.png" alt="Radovan SkillArena" className="_ppl_img" />
                          </div>
                          <div className="_right_inner_area_info_box_txt">
                            <h4 className="_right_inner_area_info_box_title">Radovan SkillArena</h4>
                            <p className="_right_inner_area_info_box_para">Founder &amp; CEO at Trophy</p>
                          </div>
                        </div>
                        <div className="_right_info_btn_grp">
                          <button type="button" className="_right_info_btn_link" disabled>
                            Ignore
                          </button>
                          <button type="button" className="_right_info_btn_link _right_info_btn_link_active" disabled>
                            Follow
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="_layout_right_sidebar_inner">
                    <div className="_feed_right_inner_area_card _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
                      <div className="_feed_top_fixed">
                        <div className="_feed_right_inner_area_card_content _mar_b24">
                          <h4 className="_feed_right_inner_area_card_content_title _title5">Your Friends</h4>
                          <span className="_feed_right_inner_area_card_content_txt">
                            <button type="button" className="_feed_right_inner_area_card_content_txt_link" disabled>
                              See All
                            </button>
                          </span>
                        </div>
                        <form className="_feed_right_inner_area_card_form">
                          <input
                            className="form-control me-2 _feed_right_inner_area_card_form_inpt"
                            type="search"
                            placeholder="input search text"
                            aria-label="Search friends"
                          />
                        </form>
                      </div>

                      <div className="_feed_bottom_fixed">
                        {friends.map((friend, idx) => (
                          <div
                            className={`_feed_right_inner_area_card_ppl ${friend.online ? "" : "_feed_right_inner_area_card_ppl_inactive"}`}
                            key={`${friend.name}-${idx}`}
                          >
                            <div className="_feed_right_inner_area_card_ppl_box">
                              <div className="_feed_right_inner_area_card_ppl_image">
                                <img src={friend.image} alt={friend.name} className="_box_ppl_img" />
                              </div>
                              <div className="_feed_right_inner_area_card_ppl_txt">
                                <h4 className="_feed_right_inner_area_card_ppl_title">{friend.name}</h4>
                                <p className="_feed_right_inner_area_card_ppl_para">{friend.role}</p>
                              </div>
                            </div>
                            <div className="_feed_right_inner_area_card_ppl_side">
                              {friend.online ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 14 14">
                                  <rect width="12" height="12" x="1" y="1" fill="#0ACF83" stroke="#fff" strokeWidth="2" rx="6" />
                                </svg>
                              ) : (
                                <span>5 minute ago</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
