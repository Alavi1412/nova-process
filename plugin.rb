# name: nova_process
# about: A widget to show process about nova
# version: 0.1
# authors: SMHassanAlavi
register_asset 'stylesheets/user-widget.scss'

# add_admin_route 'nova_widget.title', 'nova_process'

# Discourse::Application.routes.append do
#   get '/admin/plugins/nova_process' => 'admin/plugins#index', constraints: StaffConstraint.new
# end

after_initialize do
  SiteSetting.class_eval do
    @choices[:layouts_sidebar_right_widgets].push('nova_process')
  end
end
