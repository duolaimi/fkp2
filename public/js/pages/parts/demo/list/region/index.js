import {inject} from 'libs'
import {wrapItem, grids, list} from 'component/client'
import tree from 'component/util/tree'

const regionData = [
  {title: '目的地', idf: 'r'},
  {title: '华东', parent: 'r', idf: 'hd'},
  {title: '华南', parent: 'r', idf: 'hn'},
  {title: '中南', parent: 'r', idf: 'zn'},
  {title: '东北', parent: 'r', idf: 'db'},
  {title: '西南', parent: 'r', idf: 'xn'},
  {title: '华北', parent: 'r', idf: 'hb'},
  {title: '西北', parent: 'r', idf: 'xb'},
  {title: '其他', parent: 'r', idf: 'rest'},


  {title: '山东', parent: 'hd', idf: 'shandong'},    
  {title: '江苏', parent: 'hd', idf: 'jiangsu'},
  {title: '浙江', parent: 'hd', idf: 'zhejiang'},
  {title: '安徽', parent: 'hd', idf: 'anhui'},
    

  {title: '广东', parent: 'hn', idf: 'guangdong'},
  {title: '福建', parent: 'hn', idf: 'fujian'},
  {title: '广西', parent: 'hn', idf: 'guangxi'},
  {title: '海南', parent: 'hn', idf: 'hainan'},


  {title: '河南', parent: 'zn', idf: 'henan'},
  {title: '湖北', parent: 'zn', idf: 'hubei'},
  {title: '湖南', parent: 'zn', idf: 'hunan'},
  {title: '江西', parent: 'zn', idf: 'jiangxi'},


  {title: '辽宁', parent: 'db', idf: 'liaoning'},
  {title: '黑龙江', parent: 'db', idf: 'heilongjiang'},
  {title: '吉林', parent: 'db', idf: 'jilin'},


  {title: '四川', parent: 'xn', idf: 'sichuan'},
  {title: '云南', parent: 'xn', idf: 'yunnan'},
  {title: '贵州', parent: 'xn', idf: 'guizhou'},
  {title: '西藏', parent: 'xn', idf: 'xizang'},


  {title: '河北', parent: 'hb', idf: 'hebei'},
  {title: '山西', parent: 'hb', idf: 'hshanxi'},
  {title: '内蒙古', parent: 'hb', idf: 'neimenggu'},


  {title: '陕西', parent: 'xb', idf: 'xshanxi'},
  {title: '新疆', parent: 'xb', idf: 'xinjiang'},
  {title: '甘肃', parent: 'xb', idf: 'gansu'},
  {title: '宁夏', parent: 'xb', idf: 'ningxia'},
  {title: '青海', parent: 'xb', idf: 'qinghai'},
    

  {title: '其他', parent: 'rest', idf: 'other'},



  //三级
  {title: '青岛', url:'javascript:;', parent: 'shandong'},    
  {title: '济南', url:'javascript:;', parent: 'shandong'},    
  {title: '烟台', url:'javascript:;', parent: 'shandong'},   
  {title: '潍坊', url:'javascript:;', parent: 'shandong'},    
  {title: '临沂', url:'javascript:;', parent: 'shandong'},  
  {title: '淄博', url:'javascript:;', parent: 'shandong'},  
  {title: '济宁', url:'javascript:;', parent: 'shandong'},  
  {title: '泰安', url:'javascript:;', parent: 'shandong'},  
  {title: '聊城', url:'javascript:;', parent: 'shandong'},  
  {title: '威海', url:'javascript:;', parent: 'shandong'},  
  {title: '枣庄', url:'javascript:;', parent: 'shandong'},  
  {title: '德州', url:'javascript:;', parent: 'shandong'},  
  {title: '日照', url:'javascript:;', parent: 'shandong'},  
  {title: '东营', url:'javascript:;', parent: 'shandong'},  
  {title: '菏泽', url:'javascript:;', parent: 'shandong'},  
  {title: '滨州', url:'javascript:;', parent: 'shandong'},  
  {title: '莱芜', url:'javascript:;', parent: 'shandong'},  
  {title: '章丘', url:'javascript:;', parent: 'shandong'},  
  {title: '垦利', url:'javascript:;', parent: 'shandong'},  
  {title: '诸城', url:'javascript:;', parent: 'shandong'},  
  {title: '寿光', url:'javascript:;', parent: 'shandong'},  
  {title: '龙口', url:'javascript:;', parent: 'shandong'},

    
  {title: '苏州', url:'javascript:;', parent: 'jiangsu'},    
  {title: '南京', url:'javascript:;', parent: 'jiangsu'},    
  {title: '无锡', url:'javascript:;', parent: 'jiangsu'},    
  {title: '常州', url:'javascript:;', parent: 'jiangsu'},    
  {title: '徐州', url:'javascript:;', parent: 'jiangsu'},    
  {title: '南通', url:'javascript:;', parent: 'jiangsu'},    
  {title: '扬州', url:'javascript:;', parent: 'jiangsu'},    
  {title: '盐城', url:'javascript:;', parent: 'jiangsu'},    
  {title: '淮安', url:'javascript:;', parent: 'jiangsu'},    
  {title: '连云港', url:'javascript:;', parent: 'jiangsu'},    
  {title: '泰州', url:'javascript:;', parent: 'jiangsu'},    
  {title: '宿迁', url:'javascript:;', parent: 'jiangsu'},    
  {title: '镇江', url:'javascript:;', parent: 'jiangsu'},    
  {title: '沭阳', url:'javascript:;', parent: 'jiangsu'},    
  {title: '大丰', url:'javascript:;', parent: 'jiangsu'},    
  {title: '如皋', url:'javascript:;', parent: 'jiangsu'},    
  {title: '启东', url:'javascript:;', parent: 'jiangsu'},    
  {title: '溧阳', url:'javascript:;', parent: 'jiangsu'},    
  {title: '海门', url:'javascript:;', parent: 'jiangsu'},    
  {title: '扬中', url:'javascript:;', parent: 'jiangsu'},    
  {title: '兴化', url:'javascript:;', parent: 'jiangsu'},    
  {title: '新沂', url:'javascript:;', parent: 'jiangsu'},    
  {title: '泰兴', url:'javascript:;', parent: 'jiangsu'},    
  {title: '如东', url:'javascript:;', parent: 'jiangsu'},    
  {title: '邳州', url:'javascript:;', parent: 'jiangsu'},    
  {title: '沛县', url:'javascript:;', parent: 'jiangsu'},    
  {title: '靖江', url:'javascript:;', parent: 'jiangsu'},    
  {title: '建湖', url:'javascript:;', parent: 'jiangsu'},    
  {title: '海安', url:'javascript:;', parent: 'jiangsu'},    
  {title: '东台', url:'javascript:;', parent: 'jiangsu'},    
  {title: '丹阳', url:'javascript:;', parent: 'jiangsu'},    


  {title: '杭州', url:'javascript:;', parent: 'zhejiang'},    
  {title: '宁波', url:'javascript:;', parent: 'zhejiang'},    
  {title: '温州', url:'javascript:;', parent: 'zhejiang'},    
  {title: '金华', url:'javascript:;', parent: 'zhejiang'},    
  {title: '嘉兴', url:'javascript:;', parent: 'zhejiang'},    
  {title: '台州', url:'javascript:;', parent: 'zhejiang'},    
  {title: '绍兴', url:'javascript:;', parent: 'zhejiang'},    
  {title: '湖州', url:'javascript:;', parent: 'zhejiang'},    
  {title: '丽水', url:'javascript:;', parent: 'zhejiang'},    
  {title: '衡州', url:'javascript:;', parent: 'zhejiang'},    
  {title: '舟山', url:'javascript:;', parent: 'zhejiang'},    
  {title: '乐清', url:'javascript:;', parent: 'zhejiang'},    
  {title: '瑞安', url:'javascript:;', parent: 'zhejiang'},    
  {title: '义乌', url:'javascript:;', parent: 'zhejiang'},    
  {title: '余姚', url:'javascript:;', parent: 'zhejiang'},    
  {title: '诸暨', url:'javascript:;', parent: 'zhejiang'},    
  {title: '象山', url:'javascript:;', parent: 'zhejiang'},    
  {title: '温岭', url:'javascript:;', parent: 'zhejiang'},    
  {title: '桐乡', url:'javascript:;', parent: 'zhejiang'},    
  {title: '慈溪', url:'javascript:;', parent: 'zhejiang'},    
  {title: '长兴', url:'javascript:;', parent: 'zhejiang'},    
  {title: '嘉善', url:'javascript:;', parent: 'zhejiang'},    
  {title: '海宁', url:'javascript:;', parent: 'zhejiang'},    
  {title: '德清', url:'javascript:;', parent: 'zhejiang'},    
  {title: '东阳', url:'javascript:;', parent: 'zhejiang'},  


  {title: '合肥', url:'javascript:;', parent: 'anhui'},  
  {title: '芜湖', url:'javascript:;', parent: 'anhui'},  
  {title: '蚌埠', url:'javascript:;', parent: 'anhui'},  
  {title: '阜阳', url:'javascript:;', parent: 'anhui'},  
  {title: '淮南', url:'javascript:;', parent: 'anhui'},  
  {title: '安庆', url:'javascript:;', parent: 'anhui'},  
  {title: '宿州', url:'javascript:;', parent: 'anhui'},  
  {title: '六安', url:'javascript:;', parent: 'anhui'},  
  {title: '淮北', url:'javascript:;', parent: 'anhui'},  
  {title: '滁州', url:'javascript:;', parent: 'anhui'},  
  {title: '马鞍山', url:'javascript:;', parent: 'anhui'},  
  {title: '铜陵', url:'javascript:;', parent: 'anhui'},  
  {title: '宣城', url:'javascript:;', parent: 'anhui'},  
  {title: '亳州', url:'javascript:;', parent: 'anhui'},  
  {title: '黄山', url:'javascript:;', parent: 'anhui'},  
  {title: '池州', url:'javascript:;', parent: 'anhui'},  
  {title: '巢湖', url:'javascript:;', parent: 'anhui'},  
  {title: '和县', url:'javascript:;', parent: 'anhui'},  
  {title: '霍邱', url:'javascript:;', parent: 'anhui'},  
  {title: '桐城', url:'javascript:;', parent: 'anhui'},  
  {title: '宁国', url:'javascript:;', parent: 'anhui'},  
  {title: '天长', url:'javascript:;', parent: 'anhui'}, 
  

  {title: '广州', url:'javascript:;', parent: 'guangdong'},    
  {title: '深圳', url:'javascript:;', parent: 'guangdong'},    
  {title: '东莞', url:'javascript:;', parent: 'guangdong'},    
  {title: '佛山', url:'javascript:;', parent: 'guangdong'},    
  {title: '中山', url:'javascript:;', parent: 'guangdong'},    
  {title: '珠海', url:'javascript:;', parent: 'guangdong'},    
  {title: '惠州', url:'javascript:;', parent: 'guangdong'},    
  {title: '江门', url:'javascript:;', parent: 'guangdong'},    
  {title: '汕头', url:'javascript:;', parent: 'guangdong'},    
  {title: '湛江', url:'javascript:;', parent: 'guangdong'},    
  {title: '肇庆', url:'javascript:;', parent: 'guangdong'},    
  {title: '茂名', url:'javascript:;', parent: 'guangdong'},    
  {title: '揭阳', url:'javascript:;', parent: 'guangdong'},    
  {title: '梅州', url:'javascript:;', parent: 'guangdong'},    
  {title: '清远', url:'javascript:;', parent: 'guangdong'},    
  {title: '阳江', url:'javascript:;', parent: 'guangdong'},    
  {title: '韶关', url:'javascript:;', parent: 'guangdong'},    
  {title: '河源', url:'javascript:;', parent: 'guangdong'},    
  {title: '云浮', url:'javascript:;', parent: 'guangdong'},    
  {title: '汕尾', url:'javascript:;', parent: 'guangdong'},    
  {title: '潮州', url:'javascript:;', parent: 'guangdong'},    
  {title: '台山', url:'javascript:;', parent: 'guangdong'},    
  {title: '阳春', url:'javascript:;', parent: 'guangdong'},    
  {title: '顺德', url:'javascript:;', parent: 'guangdong'},    
  {title: '惠东', url:'javascript:;', parent: 'guangdong'},    
  {title: '博罗', url:'javascript:;', parent: 'guangdong'},


  {title: '福州', url:'javascript:;', parent: 'fujian'},    
  {title: '厦门', url:'javascript:;', parent: 'fujian'},    
  {title: '泉州', url:'javascript:;', parent: 'fujian'},    
  {title: '莆田', url:'javascript:;', parent: 'fujian'},    
  {title: '漳州', url:'javascript:;', parent: 'fujian'},    
  {title: '宁德', url:'javascript:;', parent: 'fujian'},    
  {title: '三明', url:'javascript:;', parent: 'fujian'},    
  {title: '南平', url:'javascript:;', parent: 'fujian'},    
  {title: '龙岩', url:'javascript:;', parent: 'fujian'},    
  {title: '武夷山', url:'javascript:;', parent: 'fujian'},    
  {title: '石狮', url:'javascript:;', parent: 'fujian'},    
  {title: '晋江', url:'javascript:;', parent: 'fujian'},    
  {title: '南安', url:'javascript:;', parent: 'fujian'},    
  

  {title: '南宁', url:'javascript:;', parent: 'guangxi'},  
  {title: '柳州', url:'javascript:;', parent: 'guangxi'},  
  {title: '桂林', url:'javascript:;', parent: 'guangxi'},  
  {title: '玉林', url:'javascript:;', parent: 'guangxi'},  
  {title: '梧州', url:'javascript:;', parent: 'guangxi'},  
  {title: '北海', url:'javascript:;', parent: 'guangxi'},  
  {title: '贵港', url:'javascript:;', parent: 'guangxi'},  
  {title: '钦州', url:'javascript:;', parent: 'guangxi'},  
  {title: '百色', url:'javascript:;', parent: 'guangxi'},  
  {title: '河池', url:'javascript:;', parent: 'guangxi'},  
  {title: '来宾', url:'javascript:;', parent: 'guangxi'},  
  {title: '贺州', url:'javascript:;', parent: 'guangxi'},  
  {title: '防城港', url:'javascript:;', parent: 'guangxi'},  


  {title: '海口', url:'javascript:;', parent: 'hainan'},
  {title: '三亚', url:'javascript:;', parent: 'hainan'},
  {title: '五指山', url:'javascript:;', parent: 'hainan'},
  {title: '三沙', url:'javascript:;', parent: 'hainan'},
  {title: '琼海', url:'javascript:;', parent: 'hainan'},
  {title: '文昌', url:'javascript:;', parent: 'hainan'},
  {title: '万宁', url:'javascript:;', parent: 'hainan'},
  {title: '屯昌', url:'javascript:;', parent: 'hainan'},
  {title: '琼中', url:'javascript:;', parent: 'hainan'},
  {title: '陵水', url:'javascript:;', parent: 'hainan'},
  {title: '东方', url:'javascript:;', parent: 'hainan'},
  {title: '安定', url:'javascript:;', parent: 'hainan'},
  {title: '澄迈', url:'javascript:;', parent: 'hainan'},
  {title: '保亭', url:'javascript:;', parent: 'hainan'},
  {title: '白沙', url:'javascript:;', parent: 'hainan'},
  {title: '儋州', url:'javascript:;', parent: 'hainan'},


  {title: '郑州', url:'javascript:;', parent: 'henan'},    
  {title: '洛阳', url:'javascript:;', parent: 'henan'},    
  {title: '新乡', url:'javascript:;', parent: 'henan'},    
  {title: '南阳', url:'javascript:;', parent: 'henan'},    
  {title: '许昌', url:'javascript:;', parent: 'henan'},    
  {title: '平顶山', url:'javascript:;', parent: 'henan'},    
  {title: '安阳', url:'javascript:;', parent: 'henan'},    
  {title: '焦作', url:'javascript:;', parent: 'henan'},    
  {title: '商丘', url:'javascript:;', parent: 'henan'},    
  {title: '开封', url:'javascript:;', parent: 'henan'},    
  {title: '濮阳', url:'javascript:;', parent: 'henan'},    
  {title: '周口', url:'javascript:;', parent: 'henan'},    
  {title: '信阳', url:'javascript:;', parent: 'henan'},    
  {title: '驻马店', url:'javascript:;', parent: 'henan'},    
  {title: '漯河', url:'javascript:;', parent: 'henan'},    
  {title: '三门峡', url:'javascript:;', parent: 'henan'},    
  {title: '鹤壁', url:'javascript:;', parent: 'henan'},    
  {title: '济源', url:'javascript:;', parent: 'henan'},    
  {title: '明港', url:'javascript:;', parent: 'henan'},    
  {title: '鄢陵', url:'javascript:;', parent: 'henan'},    
  {title: '禹州', url:'javascript:;', parent: 'henan'},    
  {title: '长葛', url:'javascript:;', parent: 'henan'},    
  

  {title: '武汉', url:'javascript:;', parent: 'hubei'},
  {title: '宜昌', url:'javascript:;', parent: 'hubei'},
  {title: '襄阳', url:'javascript:;', parent: 'hubei'},
  {title: '荆州', url:'javascript:;', parent: 'hubei'},
  {title: '十堰', url:'javascript:;', parent: 'hubei'},
  {title: '黄石', url:'javascript:;', parent: 'hubei'},
  {title: '孝感', url:'javascript:;', parent: 'hubei'},
  {title: '恩施', url:'javascript:;', parent: 'hubei'},
  {title: '荆门', url:'javascript:;', parent: 'hubei'},
  {title: '咸宁', url:'javascript:;', parent: 'hubei'},
  {title: '鄂州', url:'javascript:;', parent: 'hubei'},
  {title: '随州', url:'javascript:;', parent: 'hubei'},
  {title: '潜江', url:'javascript:;', parent: 'hubei'},
  {title: '仙桃', url:'javascript:;', parent: 'hubei'},
  {title: '神农架', url:'javascript:;', parent: 'hubei'},
  {title: '宜都', url:'javascript:;', parent: 'hubei'},
  

  {title: '长沙', url:'javascript:;', parent: 'hunan'},
  {title: '株洲', url:'javascript:;', parent: 'hunan'},
  {title: '益阳', url:'javascript:;', parent: 'hunan'},
  {title: '常德', url:'javascript:;', parent: 'hunan'},
  {title: '衡阳', url:'javascript:;', parent: 'hunan'},
  {title: '湘潭', url:'javascript:;', parent: 'hunan'},
  {title: '岳阳', url:'javascript:;', parent: 'hunan'},
  {title: '昭阳', url:'javascript:;', parent: 'hunan'},
  {title: '怀化', url:'javascript:;', parent: 'hunan'},
  {title: '娄底', url:'javascript:;', parent: 'hunan'},
  {title: '湘西', url:'javascript:;', parent: 'hunan'},
  {title: '张家界', url:'javascript:;', parent: 'hunan'},


  {title: '南昌', url:'javascript:;', parent: 'jiangxi'},
  {title: '赣州', url:'javascript:;', parent: 'jiangxi'},
  {title: '九江', url:'javascript:;', parent: 'jiangxi'},
  {title: '宜春', url:'javascript:;', parent: 'jiangxi'},
  {title: '吉安', url:'javascript:;', parent: 'jiangxi'},
  {title: '上饶', url:'javascript:;', parent: 'jiangxi'},
  {title: '萍乡', url:'javascript:;', parent: 'jiangxi'},
  {title: '抚州', url:'javascript:;', parent: 'jiangxi'},
  {title: '景德镇', url:'javascript:;', parent: 'jiangxi'},
  {title: '新余', url:'javascript:;', parent: 'jiangxi'},
  {title: '鹰潭', url:'javascript:;', parent: 'jiangxi'},
  {title: '永新', url:'javascript:;', parent: 'jiangxi'},


  {title: '沈阳', url:'javascript:;', parent: 'liaoning'},    
  {title: '大连', url:'javascript:;', parent: 'liaoning'},    
  {title: '鞍山', url:'javascript:;', parent: 'liaoning'},    
  {title: '锦州', url:'javascript:;', parent: 'liaoning'},    
  {title: '抚顺', url:'javascript:;', parent: 'liaoning'},    
  {title: '营口', url:'javascript:;', parent: 'liaoning'},    
  {title: '盘锦', url:'javascript:;', parent: 'liaoning'},    
  {title: '朝阳', url:'javascript:;', parent: 'liaoning'},    
  {title: '丹东', url:'javascript:;', parent: 'liaoning'},    
  {title: '辽阳', url:'javascript:;', parent: 'liaoning'},    
  {title: '本溪', url:'javascript:;', parent: 'liaoning'},    
  {title: '葫芦岛', url:'javascript:;', parent: 'liaoning'},    
  {title: '铁岭', url:'javascript:;', parent: 'liaoning'},    
  {title: '阜新', url:'javascript:;', parent: 'liaoning'},    
  {title: '庄河', url:'javascript:;', parent: 'liaoning'},    
  {title: '瓦房店', url:'javascript:;', parent: 'liaoning'},    
  
  
  {title: '黑尔滨', url:'javascript:;', parent: 'heilongjiang'},    
  {title: '大庆', url:'javascript:;', parent: 'heilongjiang'},    
  {title: '齐齐哈尔', url:'javascript:;', parent: 'heilongjiang'},    
  {title: '牡丹江', url:'javascript:;', parent: 'heilongjiang'},    
  {title: '绥化', url:'javascript:;', parent: 'heilongjiang'},    
  {title: '佳木斯', url:'javascript:;', parent: 'heilongjiang'},    
  {title: '鸡西', url:'javascript:;', parent: 'heilongjiang'},    
  {title: '双鸭山', url:'javascript:;', parent: 'heilongjiang'},    
  {title: '鹤岗', url:'javascript:;', parent: 'heilongjiang'},    
  {title: '黑河', url:'javascript:;', parent: 'heilongjiang'},    
  {title: '伊春', url:'javascript:;', parent: 'heilongjiang'},    
  {title: '七台河', url:'javascript:;', parent: 'heilongjiang'},    
  {title: '大兴安岭', url:'javascript:;', parent: 'heilongjiang'},


  {title: '长春', url:'javascript:;', parent: 'jilin'},    
  {title: '吉林', url:'javascript:;', parent: 'jilin'},    
  {title: '四平', url:'javascript:;', parent: 'jilin'},    
  {title: '延边', url:'javascript:;', parent: 'jilin'},    
  {title: '松原', url:'javascript:;', parent: 'jilin'},    
  {title: '白城', url:'javascript:;', parent: 'jilin'},    
  {title: '通话', url:'javascript:;', parent: 'jilin'},    
  {title: '白山', url:'javascript:;', parent: 'jilin'},    
  {title: '辽源', url:'javascript:;', parent: 'jilin'},    
 
    
  {title: '成都', url:'javascript:;', parent: 'sichuan'},    
  {title: '绵阳', url:'javascript:;', parent: 'sichuan'},    
  {title: '德阳', url:'javascript:;', parent: 'sichuan'},    
  {title: '南充', url:'javascript:;', parent: 'sichuan'},    
  {title: '宜宾', url:'javascript:;', parent: 'sichuan'},    
  {title: '自贡', url:'javascript:;', parent: 'sichuan'},    
  {title: '乐山', url:'javascript:;', parent: 'sichuan'},    
  {title: '泸州', url:'javascript:;', parent: 'sichuan'},    
  {title: '达州', url:'javascript:;', parent: 'sichuan'},    
  {title: '遂宁', url:'javascript:;', parent: 'sichuan'},    
  {title: '攀枝花', url:'javascript:;', parent: 'sichuan'},    
  {title: '眉山', url:'javascript:;', parent: 'sichuan'},    
  {title: '广安', url:'javascript:;', parent: 'sichuan'},    
  {title: '资阳', url:'javascript:;', parent: 'sichuan'},    
  {title: '凉山', url:'javascript:;', parent: 'sichuan'},    
  {title: '广元', url:'javascript:;', parent: 'sichuan'},    
  {title: '雅安', url:'javascript:;', parent: 'sichuan'},    
  {title: '巴中', url:'javascript:;', parent: 'sichuan'},    
  {title: '阿坝', url:'javascript:;', parent: 'sichuan'},    
  {title: '甘孜', url:'javascript:;', parent: 'sichuan'}, 


  {title: '昆明', url:'javascript:;', parent: 'yunnan'},    
  {title: '曲靖', url:'javascript:;', parent: 'yunnan'},    
  {title: '大理', url:'javascript:;', parent: 'yunnan'},    
  {title: '红河', url:'javascript:;', parent: 'yunnan'},    
  {title: '玉溪', url:'javascript:;', parent: 'yunnan'},    
  {title: '两江', url:'javascript:;', parent: 'yunnan'},    
  {title: '文山', url:'javascript:;', parent: 'yunnan'},    
  {title: '楚雄', url:'javascript:;', parent: 'yunnan'},    
  {title: '西双版纳', url:'javascript:;', parent: 'yunnan'},    
  {title: '昭通', url:'javascript:;', parent: 'yunnan'},    
  {title: '德宏', url:'javascript:;', parent: 'yunnan'},    
  {title: '普洱', url:'javascript:;', parent: 'yunnan'},    
  {title: '保山', url:'javascript:;', parent: 'yunnan'},    
  {title: '临沧', url:'javascript:;', parent: 'yunnan'},    
  {title: '迪庆', url:'javascript:;', parent: 'yunnan'},    
  {title: '怒江', url:'javascript:;', parent: 'yunnan'}, 


  {title: '贵阳', url:'javascript:;', parent: 'guizhou'},    
  {title: '遵义', url:'javascript:;', parent: 'guizhou'},    
  {title: '黔东南', url:'javascript:;', parent: 'guizhou'},    
  {title: '黔南', url:'javascript:;', parent: 'guizhou'},    
  {title: '六盘水', url:'javascript:;', parent: 'guizhou'},    
  {title: '毕节', url:'javascript:;', parent: 'guizhou'},    
  {title: '铜仁', url:'javascript:;', parent: 'guizhou'},    
  {title: '安顺', url:'javascript:;', parent: 'guizhou'},    
  {title: '黔西南', url:'javascript:;', parent: 'guizhou'},    

   
  {title: '拉萨', url:'javascript:;', parent: 'xizang'},    
  {title: '日喀则', url:'javascript:;', parent: 'xizang'},    
  {title: '山南', url:'javascript:;', parent: 'xizang'},    
  {title: '林芝', url:'javascript:;', parent: 'xizang'},    
  {title: '昌都', url:'javascript:;', parent: 'xizang'},    
  {title: '那曲', url:'javascript:;', parent: 'xizang'},    
  {title: '阿里', url:'javascript:;', parent: 'xizang'},    
  {title: '日土', url:'javascript:;', parent: 'xizang'},    
  {title: '改则', url:'javascript:;', parent: 'xizang'},    


  {title: '石家庄', url:'javascript:;', parent: 'hebei'},    
  {title: '保定', url:'javascript:;', parent: 'hebei'},    
  {title: '唐山', url:'javascript:;', parent: 'hebei'},    
  {title: '廊坊', url:'javascript:;', parent: 'hebei'},    
  {title: '邯郸', url:'javascript:;', parent: 'hebei'},    
  {title: '秦皇岛', url:'javascript:;', parent: 'hebei'},    
  {title: '沧州', url:'javascript:;', parent: 'hebei'},    
  {title: '衡水', url:'javascript:;', parent: 'hebei'},    
  {title: '张家口', url:'javascript:;', parent: 'hebei'},    
  {title: '承德', url:'javascript:;', parent: 'hebei'},    
  {title: '定州', url:'javascript:;', parent: 'hebei'},    
  {title: '馆陶', url:'javascript:;', parent: 'hebei'},    
  {title: '张北', url:'javascript:;', parent: 'hebei'},    
  {title: '赵县', url:'javascript:;', parent: 'hebei'},    
  {title: '正定', url:'javascript:;', parent: 'hebei'}, 


  {title: '太原', url:'javascript:;', parent: 'hshanxi'},    
  {title: '临汾', url:'javascript:;', parent: 'hshanxi'},    
  {title: '大同', url:'javascript:;', parent: 'hshanxi'},    
  {title: '运城', url:'javascript:;', parent: 'hshanxi'},    
  {title: '晋中', url:'javascript:;', parent: 'hshanxi'},    
  {title: '长治', url:'javascript:;', parent: 'hshanxi'},    
  {title: '晋城', url:'javascript:;', parent: 'hshanxi'},    
  {title: '阳泉', url:'javascript:;', parent: 'hshanxi'},    
  {title: '吕梁', url:'javascript:;', parent: 'hshanxi'},    
  {title: '忻州', url:'javascript:;', parent: 'hshanxi'},    
  {title: '朔州', url:'javascript:;', parent: 'hshanxi'},    
  {title: '临猗', url:'javascript:;', parent: 'hshanxi'},    
  {title: '清徐', url:'javascript:;', parent: 'hshanxi'},   


  {title: '呼和浩特', url:'javascript:;', parent: 'neimenggu'},    
  {title: '包头', url:'javascript:;', parent: 'neimenggu'},    
  {title: '赤峰', url:'javascript:;', parent: 'neimenggu'},    
  {title: '鄂尔多斯', url:'javascript:;', parent: 'neimenggu'},    
  {title: '通辽', url:'javascript:;', parent: 'neimenggu'},    
  {title: '呼伦贝尔', url:'javascript:;', parent: 'neimenggu'},    
  {title: '巴彦淖尔市', url:'javascript:;', parent: 'neimenggu'},    
  {title: '乌兰察市', url:'javascript:;', parent: 'neimenggu'},    
  {title: '锡林郭勒', url:'javascript:;', parent: 'neimenggu'},    
  {title: '兴安盟', url:'javascript:;', parent: 'neimenggu'},    
  {title: '乌海', url:'javascript:;', parent: 'neimenggu'},    
  {title: '阿拉善盟', url:'javascript:;', parent: 'neimenggu'},    
  {title: '海拉尔', url:'javascript:;', parent: 'neimenggu'},    
  
  
  {title: '西安', url:'javascript:;', parent: 'xshanxi'},    
  {title: '咸阳', url:'javascript:;', parent: 'xshanxi'},    
  {title: '宝鸡', url:'javascript:;', parent: 'xshanxi'},    
  {title: '渭南', url:'javascript:;', parent: 'xshanxi'},    
  {title: '汉中', url:'javascript:;', parent: 'xshanxi'},    
  {title: '榆林', url:'javascript:;', parent: 'xshanxi'},    
  {title: '延安', url:'javascript:;', parent: 'xshanxi'},    
  {title: '安康', url:'javascript:;', parent: 'xshanxi'},    
  {title: '商洛', url:'javascript:;', parent: 'xshanxi'},    
  {title: '铜川', url:'javascript:;', parent: 'xshanxi'},    
  
  
  {title: '乌鲁木齐', url:'javascript:;', parent: 'xinjiang'},    
  {title: '昌吉', url:'javascript:;', parent: 'xinjiang'},    
  {title: '巴音郭楞', url:'javascript:;', parent: 'xinjiang'},    
  {title: '伊犁', url:'javascript:;', parent: 'xinjiang'},    
  {title: '阿克苏', url:'javascript:;', parent: 'xinjiang'},    
  {title: '喀什', url:'javascript:;', parent: 'xinjiang'},    
  {title: '哈密', url:'javascript:;', parent: 'xinjiang'},    
  {title: '克拉玛依', url:'javascript:;', parent: 'xinjiang'},    
  {title: '博尔塔拉', url:'javascript:;', parent: 'xinjiang'},    
  {title: '吐鲁番', url:'javascript:;', parent: 'xinjiang'},    
  {title: '和田', url:'javascript:;', parent: 'xinjiang'},    
  {title: '石河子', url:'javascript:;', parent: 'xinjiang'},    
  {title: '克孜勒苏', url:'javascript:;', parent: 'xinjiang'},    
  {title: '阿拉尔', url:'javascript:;', parent: 'xinjiang'},    
  {title: '五家渠', url:'javascript:;', parent: 'xinjiang'},    
  {title: '图木舒克', url:'javascript:;', parent: 'xinjiang'},    
  {title: '库木舒克', url:'javascript:;', parent: 'xinjiang'},    
  {title: '库尔勒', url:'javascript:;', parent: 'xinjiang'},    
  {title: '阿勒泰', url:'javascript:;', parent: 'xinjiang'},    
  {title: '塔城', url:'javascript:;', parent: 'xinjiang'},    
  
  
  {title: '兰州', url:'javascript:;', parent: 'gansu'},    
  {title: '天水', url:'javascript:;', parent: 'gansu'},    
  {title: '白银', url:'javascript:;', parent: 'gansu'},    
  {title: '庆阳', url:'javascript:;', parent: 'gansu'},    
  {title: '平凉', url:'javascript:;', parent: 'gansu'},    
  {title: '酒泉', url:'javascript:;', parent: 'gansu'},    
  {title: '张掖', url:'javascript:;', parent: 'gansu'},    
  {title: '武威', url:'javascript:;', parent: 'gansu'},    
  {title: '定西', url:'javascript:;', parent: 'gansu'},    
  {title: '金昌', url:'javascript:;', parent: 'gansu'},    
  {title: '陇南', url:'javascript:;', parent: 'gansu'},    
  {title: '临夏', url:'javascript:;', parent: 'gansu'},    
  {title: '嘉峪关', url:'javascript:;', parent: 'gansu'},    
  {title: '甘南', url:'javascript:;', parent: 'gansu'},    
  
  
  {title: '银川', url:'javascript:;', parent: 'ningxia'},    
  {title: '吴忠', url:'javascript:;', parent: 'ningxia'},    
  {title: '石嘴山', url:'javascript:;', parent: 'ningxia'},    
  {title: '中卫', url:'javascript:;', parent: 'ningxia'},    
  {title: '固原', url:'javascript:;', parent: 'ningxia'},    

  {title: '西宁', url:'javascript:;', parent: 'qinghai'},     
  {title: '海西', url:'javascript:;', parent: 'qinghai'},     
  {title: '海北', url:'javascript:;', parent: 'qinghai'},     
  {title: '果洛', url:'javascript:;', parent: 'qinghai'},     
  {title: '海东', url:'javascript:;', parent: 'qinghai'},     
  {title: '黄南', url:'javascript:;', parent: 'qinghai'},     
  {title: '玉树', url:'javascript:;', parent: 'qinghai'},     
  {title: '海南', url:'javascript:;', parent: 'qinghai'},      

  {title: '香港', url:'javascript:;', parent: 'other'},
  {title: '澳门', url:'javascript:;', parent: 'other'},
  {title: '台湾', url:'javascript:;', parent: 'other'},
  {title: '全国', url:'javascript:;', parent: 'other'},
  {title: '其他', url:'javascript:;', parent: 'other'},

]

inject().css('/css/m/list/regionlist')
const regionTree = tree(regionData);
console.log(regionTree);
const regionList = list({
  data: regionTree,
  //itemclass,
  //listclass
})
React.render(regionList,document.getElementById('region-content'))

// const regionList = filtrate({
//   data: regionData,
//   cls: 'filterGroup',
//   // theme: 'filtrate/xxx'
//   itemMethod: function(dom, index){
//     $(dom).click((e)=>{
//       e.stopPropagation()
//       this.select(index)
      
//     })
//   }
// })
//regionList.render('side-content');
