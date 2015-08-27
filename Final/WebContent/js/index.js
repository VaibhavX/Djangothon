
/* 
Instructions:
-------------
1. Select a user
2. Try to change Name or Nickname property
3. Press "Send message to user" button and watch the nice popup window
4. Select an other user too
5. Try the multiple property edit (e.g. change status)
6. Watch the "Add new user" button hover effect
 */


/* 
Pictures: 
	http://rapsag.deviantart.com/art/Walter-White-396773756
	http://ignis-vitae.deviantart.com/art/Jesse-Pinkman-Breaking-Bad-343381256
	http://jkim34.deviantart.com/art/Saul-Goodman-369909575
 */

(function() {
  var propertiesSchema, showUsers, users;

  users = [
    {
      id: 1,
      name: "Walter White",
      userName: "Heisenberg",
      realName: "Brian Cranston",
      email: "heisenberg@breakingbad.com",
      born: "California, USA",
      dob: "1956-03-07",
      photo: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/102308/walter_white_by_rapsag.d6k88l8_(1).jpg",
      status: true,
      created: "2015-03-30 22:49:32",
      skills: ["Chemist", "Teacher", "Clever"],
      settings: {
        themeColor: "#fab000",
        motto: "Say my name!"
      }
    }, {
      id: 2,
      name: "Jesse Pinkman",
      userName: "jessy",
      realName: "Aaron Paul",
      email: "j.pinkman@breakingbad.com",
      born: "Idaho, USA",
      dob: "1979-08-27",
      photo: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/102308/jesse_pinkman___breaking_bad_by_ignis_vitae.d5ofuo8.jpg",
      status: true,
      created: "2015-03-30 23:50:11",
      skills: ["Student", "Dealer", "Unmindful"],
      settings: {
        themeColor: "#000",
        motto: "You're my free pass...!"
      }
    }, {
      id: 3,
      name: "Saul Goodman",
      userName: "saul",
      realName: "James Morgan McGill",
      email: "saul@breakingbad.com",
      born: "Illinois, USA",
      dob: "1962-10-22",
      photo: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/102308/saul_goodman_by_jkim34.d648g1z.jpg",
      status: false,
      created: "2015-03-31 13:42:50",
      skills: ["Lawyer", "Clever", "Corrupt"],
      settings: {
        themeColor: "Red",
        motto: "Better call Saul!"
      }
    }
  ];

  showUsers = function() {
    var container, tpl;
    container = $(".users");
    $.each(users, function(i, user) {
      var tpl, userDiv;
      tpl = Handlebars.compile($("#user-template").html());
      userDiv = $(tpl(user)).data("object", user).appendTo(container);
      if (!user.status) {
        return userDiv.addClass("inactive");
      }
    });
    tpl = Handlebars.compile($("#new-user-template").html());
    return $(tpl({})).appendTo(container);
  };

  $(function() {
    var getUserDivs, tl;
    showUsers();
    tl = new TimelineLite();
    tl.staggerTo(".user", 1, {
      opacity: 0.6,
      y: 0
    }, 0.2);
    $(".user .icon.status").on("click", function(e) {
      var userDiv;
      toastr.info("Change user status");
      userDiv = $(e.target).closest(".user");
      userDiv.toggleClass("inactive");
      userDiv.data("object").status = !userDiv.data("object").status;
      return e.stopPropagation();
    });
    $(".user .icon.delete").on("click", function(e) {
      toastr.info("Delete user");
      return e.stopPropagation();
    });
    $(".user .icon.clone").on("click", function(e) {
      toastr.info("Clone user");
      return e.stopPropagation();
    });
    $(".user .icon.send").on("click", function(e) {
      $(".popup").addClass("show");
      return e.stopPropagation();
    });
    $(".popup .icon i").on("click", function() {
      $(".popup").removeClass("show");
      return toastr.info("Message sent");
    });
    getUserDivs = function() {
      return $(".user.selected");
    };
    $(".user:not(.new)").on("click", function() {
      var $this, pjs, selectedCount, selectedObjs;
      $this = $(this);
      $this.toggleClass("selected");
      selectedCount = $(".user.selected").length;
      if (selectedCount > 0) {
        selectedObjs = [];
        $(".user.selected").each(function(i, user) {
          return selectedObjs.push($(user).data("object"));
        });
        pjs = new PJS(".propertyEditor", propertiesSchema, selectedObjs);
        pjs.on("changed", function(editor, value, objects) {
          var divs;
          divs = getUserDivs(objects);
          switch (editor.fieldName) {
            case "name":
              return $(divs).find(".info .name").text(value);
            case "userName":
              return $(divs).find(".info .nickName").text(value);
            case "born":
              return $(divs).find("dl dd:eq(0)").text(value);
            case "dob":
              return $(divs).find("dl dd:eq(1)").text(value);
            case "email":
              return $(divs).find("dl dd:eq(2)").text(value);
            case "status":
              if (value) {
                return $(divs).removeClass("inactive");
              } else {
                return $(divs).addClass("inactive");
              }
          }
        });
        pjs.on("function-sendMessage", function(editor, objects) {
          return $(".popup").addClass("show");
        });
        TweenLite.to(".editorBox", 0.8, {
          right: 0,
          ease: Power4.easeOut
        });
        return TweenLite.to(".users", 1.9, {
          "margin-right": "350px",
          ease: Power2.easeOut
        });
      } else {
        TweenLite.to(".editorBox", 0.8, {
          right: "-350px",
          ease: Power4.easeOut
        });
        return TweenLite.to(".users", 1.8, {
          "margin-right": "0px",
          ease: Power2.easeOut
        });
      }
    });
    return $(".user.new").on("click", function() {
      return toastr.success("Add a new user");
    });
  });

  propertiesSchema = {
    editors: [
      {
        field: "name",
        title: "Name",
        type: "text",
        required: true,
        multiEdit: true,
        featured: true
      }, {
        field: "userName",
        title: "Nick name",
        type: "text",
        required: true,
        multiEdit: false,
        featured: true
      }, {
        field: "realName",
        title: "Real full name",
        toolTip: "This is the user's real born name",
        type: "text",
        required: false,
        multiEdit: false
      }, {
        field: "email",
        title: "E-mail",
        type: "email",
        required: false,
        multiEdit: false,
        field: "password",
        title: "Password",
        type: "password",
        placeHolder: "Password",
        required: true,
        multiEdit: true,
        featured: true,
        toolTip: "Enter the user's password",
        hint: "Minimum 6 characters",
        validate: function(value, objs) {
          if (value.length < 6) {
            return "Password is too short! Minimum 6 characters!";
          }
        }
      }, {
        field: "phone",
        title: "Phone",
        type: "text",
        required: false,
        multiEdit: true,
        pattern: "^[0-9]{3}-[0-9]{4}$",
        hint: "Format: 000-0000"
      }, {
        field: "born",
        title: "Born",
        type: "text",
        required: false,
        multiEdit: true
      }, {
        field: "dob",
        title: "Date of birth",
        type: "date",
        format: "YYYY-MM-DD",
        required: false,
        multiEdit: true,
        validate: function(value, objs) {
          if (value === "1963-03-07") {
            return "Invalid date!";
          }
        }
      }, {
        field: "settings.isActor",
        title: "Is an actor?",
        type: "boolean",
        required: true,
        "default": false,
        multiEdit: true
      }, {
        field: "status",
        title: "Status",
        type: "boolean",
        required: true,
        "default": false,
        multiEdit: true
      }, {
        field: "created",
        title: "Created at",
        type: "timestamp",
        format: "YYYY-MM-DD HH:mm:ss",
        required: false,
        readonly: true
      }, {
        field: "skills",
        title: "Skills",
        type: "checklist",
        multiEdit: true,
        listBox: false,
        required: true,
        rows: 6,
        values: ["Chemist", "Teacher", "Student", "Lawyer", "Dealer", "Clever", "Unmindful", "Corrupt"]
      }, {
        field: "settings.motto",
        title: "Motto",
        type: "textarea",
        required: false,
        multiEdit: true,
        placeHolder: "What do you think?",
        rows: 3
      }, {
        field: "settings.nativeLang",
        title: "Native language",
        type: "select",
        required: true,
        multiEdit: true,
        values: [
          {
            id: "en",
            name: "English"
          }, {
            id: "de",
            name: "Deutsch"
          }, {
            id: "it",
            name: "Italiano"
          }, {
            id: "es",
            name: "Español"
          }, {
            id: "fr",
            name: "Français"
          }
        ]
      }, {
        field: "sendMessage",
        title: "Send message to user",
        styleClass: "fa fa-envelope",
        type: "button",
        multiEdit: true,
        schemaFunction: true
      }, {
        field: "clone",
        title: "Clone user",
        styleClass: "fa fa-copy",
        type: "button",
        schemaFunction: true,
        multiEdit: false,
        onclick: function(objs) {
          return toastr.info("Clone selected " + objs.length + " users");
        }
      }, {
        field: "delete",
        title: "Delete user",
        styleClass: "fa fa-trash",
        type: "button",
        schemaFunction: true,
        multiEdit: true,
        onclick: function(objs) {
          return toastr.info("Delete selected " + objs.length + " users");
        }
      }
    ]
  };

}).call(this);