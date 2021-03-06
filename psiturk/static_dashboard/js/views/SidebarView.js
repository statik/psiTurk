// Generated by CoffeeScript 1.6.3
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["backbone", 'text!templates/aws-info.html', 'text!templates/hit-config.html', 'text!templates/database.html', 'text!templates/server-params.html', 'text!templates/expt-info.html', 'text!templates/server-log.html', 'text!templates/pay-and-bonus.html', 'views/validators', 'views/RunExptView', 'views/PayAndBonusView', 'collections/WorkerCollection', 'dropdown'], function(Backbone, AWSInfoTemplate, HITConfigTemplate, DatabaseTemplate, ServerParamsTemplate, ExptInfoTemplate, ServerLogTemplate, PayAndBonusTemplate, Validators, RunExptView, PayAndBonusView, Workers, dropdown) {
  var SideBarView, _ref;
  return SideBarView = (function(_super) {
    __extends(SideBarView, _super);

    function SideBarView() {
      this.render = __bind(this.render, this);
      this.redirect = __bind(this.redirect, this);
      this.saveAndRender = __bind(this.saveAndRender, this);
      _ref = SideBarView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SideBarView.prototype.initialize = function() {
      return this.render();
    };

    SideBarView.prototype.saveAndRender = function(id, generateTemplate, validate) {
      var _this = this;
      if (validate == null) {
        validate = true;
      }
      return $(id).off('click').on('click', function() {
        var validator;
        $('#content').html(generateTemplate());
        if (validate) {
          validator = new Validators;
          validator.loadValidators();
        }
        $('#myform').submit(false);
        $('.save').on("click", function(event) {
          return _this.options.pubsub.trigger("save", event);
        });
        $('.dropdown-toggle').dropdown();
        _this.options.pubsub.trigger("loadPayView");
        return _this.options.pubsub.trigger("captureUIEvents");
      });
    };

    SideBarView.prototype.redirect = function(id, url) {
      var _this = this;
      return $(id).off('click').on('click', function() {
        $('li').removeClass('selected');
        $('#overview').addClass('selected');
        _this.options.pubsub.trigger("loadContent");
        return window.open(url);
      });
    };

    SideBarView.prototype.render = function() {
      var _this = this;
      return $.when(this.options.config.fetch().done(function() {
        var awsInfo, database, exptInfo, hitConfig, payAndBonus, serverParams, validate;
        awsInfo = function() {
          return _.template(AWSInfoTemplate, {
            input: {
              aws_access_key_id: _this.options.config.get("AWS Access").aws_access_key_id,
              aws_secret_access_key: _this.options.config.get("AWS Access").aws_secret_access_key
            }
          });
        };
        hitConfig = function() {
          return _.template(HITConfigTemplate, {
            input: {
              title: _this.options.config.get("HIT Configuration").title,
              description: _this.options.config.get("HIT Configuration").description,
              keywords: _this.options.config.get("HIT Configuration").keywords,
              question_url: _this.options.config.get("HIT Configuration").question_url,
              max_assignments: _this.options.config.get("HIT Configuration").max_assignments,
              hit_lifetime: _this.options.config.get("HIT Configuration").hit_lifetime,
              reward: _this.options.config.get("HIT Configuration").reward,
              duration: _this.options.config.get("HIT Configuration").duration,
              us_only: _this.options.config.get("HIT Configuration").us_only === "1" ? "checked='checked'" : "",
              approve_requirement: _this.options.config.get("HIT Configuration").approve_requirement,
              using_sandbox: _this.options.config.get("HIT Configuration").using_sandbox
            }
          });
        };
        database = function() {
          return _.template(DatabaseTemplate, {
            input: {
              database_url: _this.options.config.get("Database Parameters").database_url,
              table_name: _this.options.config.get("Database Parameters").table_name
            }
          });
        };
        serverParams = function() {
          return _.template(ServerParamsTemplate, {
            input: {
              host: _this.options.config.get("Server Parameters").host,
              port: _this.options.config.get("Server Parameters").port,
              cutoff_time: _this.options.config.get("Server Parameters").cutoff_time,
              support_ie: _this.options.config.get("Server Parameters").support_ie === "1" ? "checked='checked'" : ""
            }
          });
        };
        exptInfo = function() {
          return _.template(ExptInfoTemplate, {
            input: {
              code_version: _this.options.config.get("Task Parameters").code_version,
              num_conds: _this.options.config.get("Task Parameters").num_conds,
              num_counters: _this.options.config.get("Task Parameters").num_counters,
              use_debriefing: _this.options.config.get("Task Parameters").use_debriefing === "1" ? "checked='checked'" : "",
              num_counters: _this.options.config.get("Task Parameters").num_counters
            }
          });
        };
        payAndBonus = function() {
          return _.template(PayAndBonusTemplate);
        };
        $('#overview').off('click').on('click', function() {
          $('li').removeClass('selected');
          $('#overview').addClass('selected');
          return _this.options.pubsub.trigger("loadContent");
        });
        _this.saveAndRender('#aws-info', awsInfo);
        _this.saveAndRender('#hit-config', hitConfig);
        _this.saveAndRender('#database', database);
        _this.saveAndRender('#server-params', serverParams);
        _this.saveAndRender('#expt-info', exptInfo);
        _this.saveAndRender('#pay_and_bonus', payAndBonus, validate = false);
        _this.redirect('#documentation', 'https://github.com/NYUCCL/psiTurk/wiki');
        _this.redirect('#contribute', 'https://github.com/NYUCCL/psiTurk');
        $("#server-log").off('click').on('click', function() {
          return $.ajax({
            url: "/launch_log",
            success: function() {
              $('li').removeClass('selected');
              $('#overview').addClass('selected');
              return _this.options.pubsub.trigger("loadContent");
            }
          });
        });
        return $('li').on('click', function() {
          $('li').removeClass('selected');
          return $(this).addClass('selected');
        });
      }));
    };

    return SideBarView;

  })(Backbone.View);
});
