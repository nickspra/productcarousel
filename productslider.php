<?php
    include_once 'icl/showaccountfav.inc.php';
    include_once 'ffc_cart/showcartbutton.inc.php';
    
    function productSlider($title=null, $perpage = null){
        
        global $mycurrency;
        global $currency_rate;
        global $db;

        if(!$perpage) $perpage = 10;
        

        
        

        /*$query="select imageurl, posterdesc, width, height, posteryear, posters.posterid, posters.postertitle, price ";
        if (isset($groupview)&&$groupview) $query.=", count(posters.posterid) as c ";
        $query.=" from posters where posters.posterid!=0 ";
        if (isset($groupview)&&$groupview) $query.="group by postertitle,posteryear";
        $query.=" order by $sort limit $start,$perpage ";

        $rs=sql_query($query,$db);*/

        $query="select * from posters order by rand() limit $perpage";
        $rs = sql_query($query, $db);

?>
    <div class="cproduct_slider">
        <?if($title){?>
            <div class="cwidth">
                <div class="product_slider_title"><?echo $title;?></div>
            </div>
        <?}?>

        <div class="product_slider">
            <div class="product_slider_btn prev">
                <div class="movie_arrows movie_arrows_prev"></div>
            </div>
            <ul>
                <?
                while ($myrow=sql_fetch_array($rs)){
                    $posterid = $myrow['posterid'];
                    $imageurl=$myrow['imageurl'];
                    $postertitle=$myrow['postertitle'];
                    $price=$myrow['price']*$currency_rate;
                    $posterdesc = array(
                        $myrow['posterdesc'],
                        $myrow['width']. "&#8221; &times; " . $myrow['height']."&#8221;",
                        $myrow['posteryear']
                    );

                ?>
                    <li>
                        <div class="postertile">
                            <div class="postertile_shell">
                                <img src="<?echo $imageurl;?>">
                                <div class="posteroverlaybg"></div>
                                <a href="viewposter.php?posterid=<?echo $posterid;?>" class="posteroverlay<?if (isset($items['p'.$posterid])&&$items['p'.$posterid]>0) echo '_';?>" id="overlay_<?echo $posterid;?>">
                                    <span class="inner_poster_overlay">
                                        <span class="product_title_desc">
                                            <span class="producttitle"><?echo $myrow['postertitle'];?></span> <?/*if ($c>1) echo "($c copies)";*/?>
                                            <span class="product_desc">
                                                <?foreach($posterdesc as $pd){
                                                    if($pd){?>
                                                        <span class="pd"><?echo " ".$pd.";";?></span>
                                                    <?}
                                                }?>
                                            </span>
                                        </span><!-- product_title_desc -->
                                        <span class="product_btns">
                                            <?ffc_showcartbutton($posterid);?>
                                            <span id="fav_<?echo $posterid;?>" class="fav_btn_wrapper" data-posterid="<?echo $posterid;?>"><?showfav($posterid);?></span>
                                        </span>
                                    </span>
                                </a>
                            </div><!-- postertile_shell -->
                            <div class="productinfo">
                                <?echo $mycurrency['symbol'];?><?echo number_format($price,2);?> <?echo $mycurrency['name'];?>
                            </div><!-- productinfo -->

                            <div class="external_poster_details mobile_external">
                                <span class="product_title_desc">
                                    <span class="producttitle"><?echo $myrow['postertitle'];?></span> <?/*if ($c>1) echo "($c copies)";*/?>
                                    <span class="product_desc">
                                        <?foreach($posterdesc as $pd){
                                            if($pd){?>
                                                <span class="pd"><?echo " ".$pd.";";?></span>
                                            <?}
                                        }?>
                                    </span>
                                </span><!-- product_title_desc -->

                                <span class="product_btns">
                                    <span class="product_price">
                                        <?echo $mycurrency['symbol'];?><?echo number_format($price,2);?> <?echo $mycurrency['name'];?>
                                    </span><!-- product_price -->
                                    
                                    <?ffc_showcartbutton($posterid);?>
                                    
                                    <span id="fav_<?echo $posterid;?>_mobile" data-posterid="<?echo $posterid;?>" data-container="_mobile" class="fav_btn_wrapper"><?showfav($posterid, null, '_mobile');?></span>
                                </span>
                            </div><!-- external_poster_details -->
                        </div><!-- postertile -->
                    </li>
                <?}//while?>

            </ul>
            <div class="product_slider_btn next">
                <div class="movie_arrows movie_arrows_next"></div>
            </div>
            <div class="clear"></div>
        </div><!-- product_slider-->
    </div><!-- cproduct_slider -->

<?}//productSlider