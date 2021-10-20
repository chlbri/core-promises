import {
  array,
  object,
  string,
  TypeOf,
  ZodOptional,
  ZodRawShape,
  ZodTypeAny,
} from 'zod';
import { isPrimitive } from '../../functions';
import type {
  OptionalDeepPartial,
  Permission,
  ZodPrimitive,
} from '../../types';
import { permissionStatusSchema } from '../status';

export const permissionDataSchema = <T extends ZodRawShape | ZodPrimitive>(
  shape: T,
): Permission<T> => {
  const payload = (
    isPrimitive(shape) ? shape.optional() : object(shape).deepPartial()
  ) as T extends ZodRawShape
    ? OptionalDeepPartial<T>
    : T extends ZodTypeAny
    ? ZodOptional<T>
    : never;

  return object({
    status: permissionStatusSchema,
    payload,
    notPermitteds: array(string()).optional(),
  });
};

const examples = permissionDataSchema({
  id: string(),
  password: string(),
});

type T = TypeOf<typeof examples>;

/*prettier-ignore*/
export const PERMISSION_DENIED_DATAS = {
  600: { status: 600 } as T,
  601: { status: 601 } as T,
  602: { status: 602 } as T,
  603: { status: 603 } as T,
  604: { status: 604 } as T,
  605: { status: 605 } as T,
  606: { status: 606 } as T,
  607: { status: 607 } as T,
  608: { status: 608 } as T,
  609: { status: 609 } as T,
  610: { status: 610 } as T,
  611: { status: 611 } as T,
  612: { status: 612 } as T,
  613: { status: 613 } as T,
  614: { status: 614 } as T,
  615: { status: 615 } as T,
  616: { status: 616 } as T,
  617: { status: 617 } as T,
  618: { status: 618 } as T,
  619: { status: 619 } as T,
  620: { status: 620 } as T,
  621: { status: 621 } as T,
  622: { status: 622 } as T,
  623: { status: 623 } as T,
  624: { status: 624 } as T,
  625: { status: 625 } as T,
  626: { status: 626 } as T,
  627: { status: 627 } as T,
  628: { status: 628 } as T,
  629: { status: 629 } as T,
  630: { status: 630 } as T,
  631: { status: 631 } as T,
  632: { status: 632 } as T,
  633: { status: 633 } as T,
  634: { status: 634 } as T,
  635: { status: 635 } as T,
  636: { status: 636 } as T,
  637: { status: 637 } as T,
  638: { status: 638 } as T,
  639: { status: 639 } as T,
  640: { status: 640 } as T,
  641: { status: 641 } as T,
  642: { status: 642 } as T,
  643: { status: 643 } as T,
  644: { status: 644 } as T,
  645: { status: 645 } as T,
  646: { status: 646 } as T,
  647: { status: 647 } as T,
  648: { status: 648 } as T,
  649: { status: 649 } as T,
  650: { status: 650 } as T,
  651: { status: 651 } as T,
  652: { status: 652 } as T,
  653: { status: 653 } as T,
  654: { status: 654 } as T,
  655: { status: 655 } as T,
  656: { status: 656 } as T,
  657: { status: 657 } as T,
  658: { status: 658 } as T,
  659: { status: 659 } as T,
  660: { status: 660 } as T,
  661: { status: 661 } as T,
  662: { status: 662 } as T,
  663: { status: 663 } as T,
  664: { status: 664 } as T,
  665: { status: 665 } as T,
  666: { status: 666 } as T,
  667: { status: 667 } as T,
  668: { status: 668 } as T,
  669: { status: 669 } as T,
  670: { status: 670 } as T,
  671: { status: 671 } as T,
  62: { status: 672 } as T,
  673: { status: 673 } as T,
  674: { status: 674 } as T,
  675: { status: 675 } as T,
  676: { status: 676 } as T,
  677: { status: 677 } as T,
  678: { status: 678 } as T,
  679: { status: 679 } as T,
  680: { status: 680 } as T,
  681: { status: 681 } as T,
  682: { status: 682 } as T,
  683: { status: 683 } as T,
  684: { status: 684 } as T,
  685: { status: 685 } as T,
  686: { status: 686 } as T,
  687: { status: 687 } as T,
  688: { status: 688 } as T,
  689: { status: 689 } as T,
  690: { status: 690 } as T,
  691: { status: 691 } as T,
  692: { status: 692 } as T,
  693: { status: 693 } as T,
  694: { status: 694 } as T,
  695: { status: 695 } as T,
  696: { status: 696 } as T,
  697: { status: 697 } as T,
  698: { status: 698 } as T,
  699: { status: 699 } as T,
} as const;
