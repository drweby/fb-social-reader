<?php
/*
* A class helper to deal with chucking out "You and 4 friends read this" etc 
*/


class FbOgAction_Format {
	
	public $your_fb_id;
	
	// Set a couple of variables that are used all over
	function __construct($your_fb_id) {
		$this->your_fb_id = $your_fb_id;
	}
	
	// Stick the appropriate name in ("you", "friend namd", with/without link etc)
	function name($read, $include_link, $replace_you=true) {
		if ($read->fb_id == $this->your_fb_id and $replace_you == true) {
			return 'You';
		} else {
			$name = $read->name;
			if ($include_link == true) {
				return '<a target="blank" href="https://facebook.com/profile.php?id='.$read->fb_id.'">'.$name.'</a>';
			} else {
				return $name;
			}
		}
	}	
	
	// A string of names in the format "You and 3 others read...". $nameCount corresponds to the number of names BEFORE "..others.."
	function name_list($reads, $nameCount) {
		$readCount = count($reads);		
		if ($readCount == 0) return "None of your friends have read this yet";		
				
		// Keep looping and adding names until $read->name_count is reached
		$htmlStr = '<div class="fb-og-read-names">';		// The html to be returned
		$namesInStr = 0;	// The number of names that have been added to the string
				
		foreach ($reads as $read) {
							
							
			// Show "X people"
			if ($nameCount == 0) {
				if ($readCount == 1) {
					$htmlStr .= $readCount.' friend';
				} else {
					$htmlStr .= ' friends';
				}
				break;
			}				
							
			// Show names 
			elseif ($namesInStr < $nameCount) {
				
				// Add name
				$htmlStr .= $this->name($read, true);
				$namesInStr++;
			
				// Add comma
				if ($namesInStr > 0 and $namesInStr < $readCount - 1 and $nameCount > 1) {
					$htmlStr .= ', ';
				}
				
				// Add and
				elseif ($namesInStr == $readCount - 1) {
					$htmlStr .= ' and ';
				}
				
			} 
			
			// No more names - just show " and others..."
			else {
				$otherCount = $readCount - $nameCount;
				if ($otherCount == 1) {
					$htmlStr .= ' 1 other friend';
				} else {
					$htmlStr .= ' and '.$otherCount.' other friends';
				}
				break;
			}
			
		}
		$htmlStr .= ' read this</div>';	
		
		return $htmlStr;
	}

	
	// Show An image thumb with link for a user
	function thumb_list($reads) {
		$max_number = 8;
		$imageStr = '<div class="fb-og-read-thumbs">';
		$i=0;
		foreach ($reads as $read) {
			if ($i == $max_number) break;
			$imageStr .= '<a target="blank" title="'.$this->name($read, false).'" href="https://facebook.com/profile.php?id='.$read->fb_id.'" ><img src="https://graph.facebook.com/'.$read->fb_id.'/picture" width="35" height="35" /></a>';
			$i++;
		}
		$imageStr .= '</div>';
		return $imageStr;
	}
	
	
	// Create a relative date in the format "5 minutes ago"
	function date_relative($ts)
	{
		if(!ctype_digit($ts))
			$ts = strtotime($ts);	
			
		//$diff = time() - $ts;
		$diff = current_time('timestamp', 0) - $ts;
		if($diff == 0)
			return 'now';
		elseif($diff > 0)
		{
			$day_diff = floor($diff / 86400);
			if($day_diff == 0)
			{
				if($diff < 60) return 'Just now';
				if($diff < 120) return '1 minute ago';
				if($diff < 3600) return floor($diff / 60) . ' minutes ago';
				if($diff < 7200) return '1 hour ago';
				if($diff < 86400) return floor($diff / 3600) . ' hours ago';
			}
			if($day_diff == 1) return 'Yesterday';
			if($day_diff < 7) return $day_diff . ' days ago';
			if($day_diff < 31) return ceil($day_diff / 7) . ' weeks ago';
			if($day_diff < 60) return 'Last month';
			return date('F Y', $ts);
		}
		else
		{
			$diff = abs($diff);
			$day_diff = floor($diff / 86400);
			if($day_diff == 0)
			{
				if($diff < 120) return 'in a minute';
				if($diff < 3600) return 'in ' . floor($diff / 60) . ' minutes';
				if($diff < 7200) return 'in an hour';
				if($diff < 86400) return 'in ' . floor($diff / 3600) . ' hours';
			}
			if($day_diff == 1) return 'Tomorrow';
			if($day_diff < 4) return date('l', $ts);
			if($day_diff < 7 + (7 - date('w'))) return 'next week';
			if(ceil($day_diff / 7) < 4) return 'in ' . ceil($day_diff / 7) . ' weeks';
			if(date('n', $ts) == date('n') + 1) return 'next month';
			return date('F Y', $ts);
		}
	}
	
}
	



