import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import ScreenServices from './ScreenServices';

const mapState = createStructuredSelector({
  texts: () => ({
    adv1: 'Быстрое и легкое управление таймером',
    adv2: 'Узнайте, как вы тратите время и контролируйте его расход',
    adv3: 'Следите за изменением прогресса вашей команды',
    adv4: 'Следите за изменением прогресса в любом интересном проекте',
    adv5: 'Распределяйте ресурсы справедливо между участниками проекта, используя алгоритмы искусственного интеллекта',
    adv6: 'Управляейте процессами вашего проекта играючи и сообща',
    adv7: 'Находите проекты, в которых видите смысл и становитесь частью лучших команд',
  }),
});

export default connect(mapState)(ScreenServices);
