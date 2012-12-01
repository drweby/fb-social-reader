<!-- Shows the sidebar content (facebook image, name, is publishing etc) -->

<img src="https://graph.facebook.com/<?php echo $fb_id; ?>/picture" width="50" height="50" alt="<?php echo $fb_name; ?>" />
<div class="name">
	<a target="blank" href="https://facebook.com/profile.php?id=<?php echo $fb_id; ?>"><?php echo $fb_name; ?></a>
</div>
<div class="meta"><?php echo $loginMeta; ?></div>
<div id="fb_logout" class="meta"><a>Logout</a></div>

<div class="clear"></div>

<div <?php if (!$is_publishing) { ?>style="display:none;"<?php } ?> class="fbToggle" id="fbToggleOn">
	<a class="fbPublishing"><span class="icon"></span><?php echo $publishingOn; ?></a> 
	<a class="fbToggleActivity"><?php echo $yourActivity; ?></a>
</div>
<div <?php if ($is_publishing) { ?>style="display:none;"<?php } ?>  class="fbToggle" id="fbToggleOff">
	<a class="fbPublishing"><span class="icon"></span><?php echo $publishingOff; ?></a> 
	<a class="fbToggleActivity"><?php echo $yourActivity; ?></a>
</div>

